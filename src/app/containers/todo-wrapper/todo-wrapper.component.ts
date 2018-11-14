import { Component, HostListener, OnInit } from '@angular/core';
import { TodoService } from '../../shared/services/todo.service';
import { TODO_CONST } from '../../shared/constants/todo-constants';
import { Observable, Subscription } from 'rxjs';
import { ITodo } from '../../shared/models/todo.model';
import { flatMap, map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as TodosActions from '../../core/store/actions/todos.actions';
import { State, getTodos } from '../../core/store';

type sortTypes = 'all' | 'done' | 'not done';

@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {
  todoList$: Observable<ITodo[]>;
  showAll = true;
  showDoneItems = false;
  buffer = [];
  isBuffer = false;


  public keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.todo.clearBuffer();
    }
  }

  constructor(private todo: TodoService, private store: Store<State>) {
    this.todo.getBufferObservable().subscribe(data => this.buffer = data);
    this.todoList$ = this.store.pipe(select(getTodos));
  }

  public cancelEditHandler() {
    this.todoList$ = this.getTaskList();
  }

  public saveHandler({item}) {
    this.todoList$ = this.todo.updateItem(item).pipe(flatMap(() => this.getTaskList()));
  }

  public onCopied(item) {
    this.todo.updateBuffer(item);
  }

  public onDelete(id) {
    this.todoList$ = this.todo.deleteItem(id).pipe(flatMap(() => this.getTaskList()));
  }

  public onPaste(index) {
    this.todoList$ = this.todoList$.pipe(map(res => {
      res.splice(index, 0, ...this.buffer);
      this.todo.clearBuffer();
      return res;
    }));
  }


  public getIsBuffer() {
    return this.isBuffer = !!this.buffer.length;
  }


  public sortItems(type: sortTypes) {
    switch (type) {
      case TODO_CONST.ALL:
        this.showAll = true;
        break;
      case TODO_CONST.DONE:
        this.showAll = false;
        this.showDoneItems = true;
        break;
      case TODO_CONST.NOT_DONE:
        this.showAll = false;
        this.showDoneItems = false;
        break;
    }
  }

  ngOnInit() {
    // this.todoList$ = this.getTaskList();
    this.store.dispatch({ type: TodosActions.TodosActionTypes.GET_TODOS });
  }

  getTaskList() {
    return this.todo.getTasks();
  }


  trackByFn(index, item) {
    return index;
  }


}
