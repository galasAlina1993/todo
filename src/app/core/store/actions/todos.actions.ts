import {Action} from '@ngrx/store';
import { ITodo } from '../../../shared/models/todo.model';

export enum TodosActionTypes {
  GET_TODOS = '[TODOS] Fetch todos requested',
  GET_TODOS_SUCCESS = '[TODOS] Fetch todos success',
  GET_TODOS_FAIL = '[TODOS] Fetch todos failed',
}

export class GetTodos implements Action {
  readonly type = TodosActionTypes.GET_TODOS;
}

export class GetTodosSuccess implements Action {
  readonly type = TodosActionTypes.GET_TODOS_SUCCESS;
  constructor(public payload: ITodo[]) {}
}

export class GetTodosFail implements Action {
  readonly type = TodosActionTypes.GET_TODOS_FAIL;
}

export type TodosActionsUnion = GetTodos | GetTodosSuccess | GetTodosFail;


