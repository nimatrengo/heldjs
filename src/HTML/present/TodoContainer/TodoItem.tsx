import {Component} from "@viYou/render/component";
import {createComponent, createElement, createText} from "@viYou/render/vdom";
import Button from "@client/components/Button";
import store, {ToDoItem} from "./store";

interface IProps {
    item: ToDoItem
}

class TodoItem extends Component<IProps, any> {

    handleRemoveTodo(){
        store.dispatch({
            type: 'REMOVE_TODO',
            payload: { name: this.props.item.name, id: this.props.item.id }
        });
    }

    build() {
        return (
            createElement('div', {
                    key: `div`,
                    className: 'flex mb-3 rounded-lg p-3 bg-gray-100 hover:opacity-70 opacity-100 border-b-2 border-b-gray-100 items-center',
                },
                createElement('p', {
                        key: 'text',
                        className: 'w-full font-bold text-xl text-gray-500',
                    },
                    createText(this.props.item.name)
                ),
                createComponent(Button, {
                    key: 'button',
                    label: 'Remove',
                    onclick: this.handleRemoveTodo.bind(this),
                    className: 'flex-no-shrink p-2 ml-2 border-2 rounded-lg text-red-400 border-red-400 hover:text-white hover:bg-red-400',
                }),
            )
        )
    }
}

export default TodoItem;