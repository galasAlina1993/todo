import { Component, HostListener, OnInit } from '@angular/core';
import { TodoService } from '../../shared/services/todo.service';
import { TODO_CONST } from '../../shared/constants/todo-constants';

type sortTypes = 'all' | 'done' | 'not done';

@Component({
  selector: 'app-todo-wrapper',
  templateUrl: './todo-wrapper.component.html',
  styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {
  todoList: Array<any>;
  showAll = true;
  showDoneItems = false;
  buffer = [];
  isBuffer = false;

  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.todo.clearBuffer();
    }
  }


  constructor(private todo: TodoService) {
    const subscription = this.todo.todoSubjObservable().subscribe(data => {
      this.todoList = data;
    });

    const bufferSubscription = this.todo.getBufferObservable().subscribe(data => this.buffer = data);
  }

  public cancelEditHandler() {
    this.todo.getTasks();
  }

  public saveHandler({item, itemIndex}) {
    this.todo.setItemByIndex(item, itemIndex);
  }

  public onCopied(item) {
    this.todo.updateBuffer(item);
  }

  public onPaste(index) {
    this.todo.pasteItems(this.buffer, index);
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
    this.todo.getTasks();
  }

}
