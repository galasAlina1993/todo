import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { delay, flatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TodoResolverService implements Resolve<Observable<any>> {
  constructor(private todo: TodoService, private http: HttpClient) {}

  private getTodoById(id) {
    return this.todo.getTaskById(id);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const todo = this.http.get(`http://localhost:3000/todos/${route.params.id}`);
    // const todo = this.getTodoById(route.params.id || 0);
    return of(todo).pipe(
      flatMap(data => data),
      delay(2000)
    );
  }

}
