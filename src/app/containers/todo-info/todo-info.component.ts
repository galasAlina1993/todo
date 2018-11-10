import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITodo } from '../../shared/models/todo.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
  styleUrls: ['./todo-info.component.scss']
})
export class TodoInfoComponent  {

  public task: ITodo ;

  constructor(private route: ActivatedRoute) {
    this.route.data.pipe(map(data => data[0])).subscribe((data: ITodo) => {
      this.task = data;
    });
  }

}
