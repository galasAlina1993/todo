import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../shared/services/todo.service';
import { TODO_CONST } from '../../shared/constants/todo-constants';

type sortTypes = 'all'| 'done' | 'not done';

@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {
  todoList: Array<any>;
  showAll = true;
  showDoneItems = false;


  constructor(private todo: TodoService ) {
    this.todo.todoSubjObservable().subscribe(data => {
      this.todoList = data;
    });
    this.todo.getTasks();

  }

  public cancelEditHandler() {
    this.todo.getTasks();
  }

  public saveHandler({item, itemIndex}) {
    this.todo.setItemByIndex(item, itemIndex);
  }


  public sortItems (type: sortTypes) {
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
  }

}
