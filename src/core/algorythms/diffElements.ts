import { VDomNode } from "../render/vdom";
import {
    AttributesUpdater,
    InsertOperation, insertUntilKey, isEqual,
    RemoveOperation, removeUntilKey, replace,
    ReplaceOperation, skip,
    SkipOperation, update,
    UpdateOperation
} from "../utilities";

export type VDomNodeUpdater =
    | UpdateOperation
    | ReplaceOperation
    | SkipOperation

export type ChildUpdater =
    | UpdateOperation
    | ReplaceOperation
    | RemoveOperation
    | SkipOperation
    | InsertOperation

export const createDiff = (oldNode: VDomNode, newNode: VDomNode): VDomNodeUpdater => {
    // skip over text nodes with the same text
    if (oldNode.kind == 'text' && newNode.kind == 'text' && oldNode.value == newNode.value) {
        return skip()
    }

    // If a text node is updated we need to replace it completely
    if (oldNode.kind == 'text' || newNode.kind == 'text') {
        return replace(newNode)
    }

    // Set props if they are different
    if(oldNode.kind == 'component' && newNode.kind == 'component' && oldNode.component == newNode.component && oldNode.instance) {
        newNode.instance = oldNode.instance
        if(isEqual(oldNode.props, newNode.props)) return skip()
        return newNode.instance.setProps(newNode.props)
    }

    // Unmount component and remove it from DOM
    if(oldNode.kind == 'component') {
        oldNode.instance.unmount()
        oldNode.instance = null
        return replace(newNode)
    }

    // replace with different component
    if(newNode.kind == 'component') {
        newNode.instance = new newNode.component()
        return {
            kind: 'replace',
            newNode: newNode.instance.initProps(newNode.props),
            callback: e => newNode.instance.notifyMounted(e)
        }
    }

    // If the tag name of a node is changed we have to replace it completely
    if (oldNode.tagname != newNode.tagname) {
        return replace(newNode)
    }

    // get the updated and replaces attributes
    const attUpdater: AttributesUpdater = {
        remove: Object.keys(oldNode.props || {})
            .filter(att => Object.keys(newNode).indexOf(att) == -1),
        set: Object.keys(newNode.props || {})
            .filter(att => oldNode.props[att] != newNode.props[att])
            .reduce((upd, att) => ({ ...upd, [att]: newNode.props[att] }), {})
    }

    // update children
    const childrenUpdater: ChildUpdater[] = childrenDiff((oldNode.children || []), (newNode.children || []))

    //Do the update
    return update(attUpdater, childrenUpdater)
}

const childrenDiff = (oldChildren: VDomNode[], newChildren: VDomNode[]): ChildUpdater[] => {
    const remainingOldChildren: [string | number, VDomNode][] = oldChildren.map(c => [c.key, c])
    const remainingNewChildren: [string | number, VDomNode][] = newChildren.map(c => [c.key, c])

    const operations: ChildUpdater[] = []

    // find the first element that got updated
    let [ nextUpdateKey ] = remainingOldChildren.find(k => remainingNewChildren.map(k => k[0]).indexOf(k[0]) != -1) || [null]

    while(nextUpdateKey) {

        // first remove all old children before the update
        removeUntilKey(operations, remainingOldChildren, nextUpdateKey)

        // then insert all new children before the update
        insertUntilKey(operations, remainingNewChildren, nextUpdateKey)

        // create the update
        operations.push(createDiff(remainingOldChildren.shift()[1], remainingNewChildren.shift()[1]));

        // find the next update
        [ nextUpdateKey ] = remainingOldChildren.find(k => remainingNewChildren.map(k => k[0]).indexOf(k[0]) != -1) || [null]
    }

    // remove all remain old children after the last update
    removeUntilKey(operations, remainingOldChildren, undefined)

    // insert all remain new children after the last update
    insertUntilKey(operations, remainingNewChildren, undefined)

    return operations
}