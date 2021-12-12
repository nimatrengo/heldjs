import {Store} from "@store";

export interface ToDoItem {
    id: number,
    name: string,
    done: boolean
}

export interface ToDoItemState {
    data? : ToDoItem[]
}

export interface ITodosReducer{
    todos : ToDoItemState
}

export const initialState: ToDoItemState = {
    data: []
};

export function todosReducer(state:ToDoItemState = initialState, action: { type: string, payload: any }) {
    switch (action.type) {
        case 'ADD_TODO': {
            const todo: ToDoItem = action.payload;
            todo.id = Math.floor(Math.random() * 100);
            const data = [...state.data, todo];
            return {
                ...state,
                data,
            };
        }
        case 'REMOVE_TODO': {
            const id: number = action.payload.id;
            const data = state.data.filter((todo) => todo.id !== id);
            return {
                ...state,
                data,
            };
        }
    }
    return state;
}

const reducers = {
    todos: todosReducer
}

const store: Store = new Store(reducers, initialState);

export default store