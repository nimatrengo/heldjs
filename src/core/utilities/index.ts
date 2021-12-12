import {VDOMAttributes, VDomNode} from "../render/vdom";
import {ChildUpdater} from "../algorythms";

export type AttributesUpdater = {
    set: VDOMAttributes
    remove: string[]
}

export interface InsertOperation {
    kind: 'insert',
    node: VDomNode
}

export interface UpdateOperation {
    kind: 'update',
    attributes: AttributesUpdater,
    children: ChildUpdater[]
}

export interface ReplaceOperation {
    kind: 'replace',
    newNode: VDomNode
    callback?: (elem: HTMLElement | Text) => void
}

export interface RemoveOperation {
    kind: 'remove'
}

export interface SkipOperation {
    kind: 'skip'
}

export const skip = (): SkipOperation => ({ kind: 'skip' })

export const replace = (newNode: VDomNode): ReplaceOperation => ({ kind: 'replace', newNode })

export const update = (attributes: AttributesUpdater, children: ChildUpdater[]): UpdateOperation => ({
    kind: 'update',
    attributes,
    children
})

export const remove = (): RemoveOperation => ({ kind: 'remove' })

export const insert = (node: VDomNode): InsertOperation => ({ kind: 'insert', node })

export const isEqual = (val1: any, val2: any): boolean => {
    return false
}

export const removeUntilKey = (operations: ChildUpdater[], elems: [string | number, VDomNode][], key: string | number) => {
    while(elems[0] && elems[0][0] != key) {
        if(elems[0][1].kind == 'component') {
            elems[0][1].instance.unmount()
            elems[0][1].instance = null
        }
        operations.push(remove())
        elems.shift()
    }
}

export const insertUntilKey = (operations: ChildUpdater[], elems: [string | number, VDomNode][], key: string | number) => {
    while(elems[0] && elems[0][0] != key) {
        operations.push(insert(elems.shift()[1]))
    }
}
