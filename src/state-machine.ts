import { writable, Writable } from "svelte/store";

type State<T extends string> = T extends string ? T : never;
type Action<T extends string> = { type: T };
type Transitions<T extends string> = { [K in State<T>]?: State<T> };
type StateMachine<T extends string> = {
    state: Writable<State<T>>;
    transition: (action: Action<T>) => void;
};

export const createStateMachine = <T extends string>(initialState: State<T>, transitions: { [K in State<T>]: Transitions<T> }): StateMachine<T> => {
    const state = writable<State<T>>(initialState);

    const transition = (action: Action<T>) => {
        const currentState = state.get();
        const newState = transitions[currentState][action.type];
        if (newState) {
            state.set(newState);
        }
    };

    return { state, transition };
}
