import {Component} from "@viYou/render/component";
import {createComponent, createElement, createText} from "@viYou/render/vdom";
import TodoItem from "./TodoItem";
import store, {ITodosReducer, ToDoItem} from "./store";

interface ToDoState {
    items: ToDoItem[];
}

class TodoList extends Component<any, any> {

    state: ToDoState = {
        items: []
    }

    handleStore(store: ITodosReducer) {
        this.setState(_ => ({items: store.todos.data}))
    }

    afterMount() {
        store.subscribe(this.handleStore.bind(this));
    }

    build() {
        return (
            createElement('div', {
                    key: 'list',
                },
                createElement('div', {
                        key: 'list-items',
                        className: 'z-50'
                    },
                    ...this.state.items?.map?.((item: ToDoItem, i) =>
                        createComponent(TodoItem, {
                            key: `item-${i}`,
                            item,
                        })
                    )
                ),
                !this.state.items.length &&
                createElement('div', {
                        key: 'div',
                        className: 'flex justify-center items-center text-gray-300 text-xl',
                    },
                    createText('There is no item')
                )
            )
        )
    }
}

export default TodoList;