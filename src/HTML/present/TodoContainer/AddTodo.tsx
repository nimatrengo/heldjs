import {Component} from "@viYou/render/component";
import {createComponent, createElement, createText} from "@viYou/render/vdom";
import Input from "@client/components/Input";
import Button from "@client/components/Button";
import store from "./store";

class AddTodo extends Component<any, any> {

    state = {
        input_value: ''
    }

    handleOnChange(v:any){
        this.setState(_ => ({input_value : v}))
    }

    handleOnEnterPressed(e:KeyboardEvent){
        if (e.key === 'Enter') {
            this.handleAddTodo();
        }
    }

    handleAddTodo(){
        store.dispatch({
            type: 'ADD_TODO',
            payload: { name: this.state.input_value, done: false },
        });
        this.handleOnChange('')
    }

    build() {
        return (
            createElement('div', {
                    className: 'mb-4',
                    key: 'text',
                },
                createElement('h1', {
                        className: 'text-gray-600 text-2xl font-bold mb-2',
                        key: 'text',
                    },
                    createText('Todo List')
                ),
                createElement('div', {
                        className: 'flex mt-4',
                        key: 'text',
                    },
                    createComponent(Input,{
                        key: 'input',
                        placeholder: 'Add Todo',
                        value: this.state.input_value,
                        onKeyup: this.handleOnEnterPressed.bind(this),
                        onChange: this.handleOnChange.bind(this),
                        className: 'shadow appearance-none border rounded-lg w-full py-2 px-3 mr-4 text-grey-700'
                    }),
                    createComponent(Button,{
                        key: 'button',
                        onclick:this.handleAddTodo.bind(this),
                        label: 'Add',
                        className: 'flex-no-shrink font-semibold px-4 py-2 border-2 rounded-lg text-grey-500 border-gray-200 hover:text-white bg-gray-100 hover:bg-blue-400',
                    })
                )
            )
        )
    }
}

export default AddTodo;