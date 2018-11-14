import { ITodo } from '../../../shared/models/todo.model';
import { TodosActionsUnion, TodosActionTypes } from '../actions/todos.actions';

export  interface ITodosState {
  todos: ITodo[];
}

export const initialState: ITodosState = {
  todos: []
};

export function reducer(state: ITodosState = initialState, action: TodosActionsUnion): ITodosState {
  switch (action.type) {
    case TodosActionTypes.GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
}


