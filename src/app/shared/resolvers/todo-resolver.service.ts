import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { delay, map } from 'rxjs/operators';
import { ITodo } from '../models/todo.model';

@Injectable()
export class TodoResolverService implements Resolve<Observable<ITodo>> {
  constructor(private todo: TodoService) {}

  private getTodoById(id) {
    return this.todo.getTaskById(id);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const todo$ = this.getTodoById(route.params.id || 0);
    return todo$.pipe(
      map(todo => todo[0])
    );
  }

}
