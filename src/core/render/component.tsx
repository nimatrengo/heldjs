import {createDiff, VDomNodeUpdater} from "../algorythms"
import {applyUpdate} from "./index"
import {VDomNode} from "./vdom"

//Component life cycle
export abstract class Component<P, S> {

    protected props: P
    protected state: S

    private currentRootNode: VDomNode
    private mountedElement: HTMLElement | Text

    protected setState(updater: (s: S) => S) {
        if (this.mountedElement == undefined) throw new Error("you are updating an unmounted component")
        this.state = updater(this.state)
        // call reactivity method
        applyUpdate(this.mountedElement, this.getUpdateDiff())
    }

    public setProps(props: P): VDomNodeUpdater {
        if (this.mountedElement == null)
            throw new Error("You are setting the props of an inmounted component")

        this.state = this.onNewProps(props, this.state)
        this.props = props
        return this.getUpdateDiff()
    }

    public initProps(props: P): VDomNode {
        this.props = props
        this.currentRootNode = this.build()
        return this.currentRootNode
    }

    private getUpdateDiff(): VDomNodeUpdater {
        const newRootNode = this.build()
        // find the diff between the new and the old root node
        const diff = createDiff(this.currentRootNode, newRootNode)
        if (diff.kind == 'replace') {
            diff.callback = elem => this.mountedElement = elem
        }

        this.currentRootNode = newRootNode
        // asynchronously apply the diff
        setTimeout(() => this.updated(this.props, this.state))
        return diff
    }

    public notifyMounted(elem: HTMLElement | Text) {
        this.mountedElement = elem
        //asynchronously call the componentDidMount
        setTimeout(() => {
            this.afterMount()
        })
    }

    public unmount() {
        this.beforeUnmount()
        this.mountedElement = null
    }

    public afterMount() {
    }

    public onNewProps(props: P, state: S): S {
        return state
    }

    public updated(props?: P, state?: S): void {
    }

    public beforeUnmount() {
    }

    public abstract build(): VDomNode
}