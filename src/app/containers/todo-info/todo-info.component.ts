import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../shared/services/todo.service';
import { ITodo } from '../../shared/models/todo.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
  styleUrls: ['./todo-info.component.scss']
})
export class TodoInfoComponent  {

  public task: ITodo ;

  constructor(private route: ActivatedRoute, private todo: TodoService) {
    this.route.data.pipe(map(data => data[0])).subscribe(data => {
      this.task = data;
    });
    // this.route.params.subscribe(params => {
    //   if (params['id']) {
    //     this.task = this.getTaskById(params['id']);
    //   }
    // });
  }

  getTaskById(id) {
    return this.todo.getTaskById(id);
  }

}
