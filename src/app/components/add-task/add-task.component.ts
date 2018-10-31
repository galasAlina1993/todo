import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ITodo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit, AfterViewInit {


  static errorMessages = {
    'name' : {
      'minlength' : 'Name should contain at least 5 characters',
      'required' : 'Name is required'
    },
    'descr' : {
      'required' : 'Description is required',
    },
    'time': {
      'required': 'Date is required',
      'mintime': 'Min Date should be late than today + 1 day'
    }
  };

  public formErrors = {
    'name': '',
    'descr': '',
    'time': ''
  };

  public minDate = this.getParsedDate(new Date());
  public model: ITodo = {
    name: '',
    descr: '',
    time: this.minDate,
    status: false
  };

  @ViewChild('taskForm') taskForm: NgForm;


  constructor(private todoService: TodoService) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.taskForm.valueChanges
      .subscribe(data => this.onValueChanged());
  }

  public onSubmit(form: NgForm) {
    const task = {...this.model};
    this.todoService.addTask(task);
    form.resetForm();

  }

  public onValueChanged() {
    if (!this.taskForm) { return; }
    const form = this.taskForm.form;

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = AddTaskComponent.errorMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] = messages[key];
        }
      }
    }
  }


  private getParsedDate(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }
}
