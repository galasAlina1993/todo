import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';

import * as todosAction from '../actions/todos.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { TodoService } from '../../../shared/services/todo.service';

@Injectable()
export class TodosEffects {
  @Effect()
  getTodos$: Observable<Action> = this.actions$
    .pipe(
      ofType<todosAction.GetTodos>(todosAction.TodosActionTypes.GET_TODOS),
      exhaustMap(
        action => this.todoService.getTasks().pipe(
          map(data => ({type: todosAction.TodosActionTypes.GET_TODOS_SUCCESS, payload: data})),
          catchError(() => of({type: todosAction.TodosActionTypes.GET_TODOS_FAIL}))
        )
      )
    );



  constructor(private actions$: Actions, private todoService: TodoService) {}
}
