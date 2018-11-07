import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../shared/services/todo.service';
import { ITodo } from '../../shared/models/todo.model';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
  styleUrls: ['./todo-info.component.scss']
})
export class TodoInfoComponent  {

  public task: ITodo ;

  constructor(private route: ActivatedRoute, private todo: TodoService) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.task = this.getTaskById(params['id']);
      }
    });
  }

  getTaskById(id) {
    return this.todo.getTaskById(id);
  }

}
