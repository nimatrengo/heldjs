import {createComponent, createElement} from "@viYou/render/vdom";
import {Component} from "@viYou/render/component";
import "../assets/css/main.css"
import "@lottiefiles/lottie-player";
import TodoList from "./TodoContainer/TodoList";
import AddTodo from "./TodoContainer/AddTodo";
import LottieRocket from "./LottieRocket";

class App extends Component<{}, {}> {

    build() {
        return (
            createElement('div', {
                    key: 'main',
                    className: 'h-full w-full flex items-center justify-center bg-gray-100 font-sans',
                },
                createElement('div', {
                        key: 'rocket',
                        className: 'opacity-10 fixed w-full right-0 z-0',
                    },
                    createComponent(LottieRocket, {
                        key: 'lottie',
                    })
                ),
                createElement('div', {
                        key: 'main',
                        className: 'bg-white h-full relative mx-4 rounded-lg border-2 border-gray-200 p-6 m-4 w-full lg:w-5/12'
                    },
                    createComponent(AddTodo,{
                        key:'add-todo'
                    }),
                    createComponent(TodoList,{
                        key: 'todoList',
                    }),
                )
            )
        );
    }
}

export default App;