interface Action {
    payload: object,
    type: string
}

interface State {
    [key: string]: any
}

export interface Reducers {
    [key: string]: Function
}

export class Store {
    private subscribers: Function[];
    private reducers: Reducers;
    private state: State;

    constructor(reducers: Reducers = {}, initialState: State = {}) {
        this.subscribers = [];
        this.reducers = reducers;
        this.state = this.reduce(initialState, {});
    }

    get value() {
        return this.state;
    }

    subscribe(fn: Function) {
        this.subscribers = [...this.subscribers, fn];
        fn(this.value);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== fn);
        };
    }

    dispatch(action: Action) {
        this.state = this.reduce(this.state, action);
        this.subscribers.forEach(fn => fn(this.value));
    }

    private reduce(state: State, action: Action | {}) {
        const newState: State = {};
        for (const prop in this.reducers) {
            newState[prop] = this.reducers[prop](state[prop], action);
        }
        return newState;
    }
}