import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class TodoService {
  private todoSubj: Subject<any> = new Subject();

  private todosList = [
    {
      name: 'вынести мусор',
      time: '18.10.2018',
      status: false
    },
    {
      name: 'вынести мусор',
      time: '18.10.2018',
      status: true
    },
    {
      name: 'вынести мусор',
      time: '18.10.2018',
      status: false
    },
    {
      name: 'вынести мусор',
      time: '18.10.2018',
      status: true
    }
  ];

  constructor() { }

  public getTasks () {
    return this.fetchTasks(this.todosList);
  }

  public fetchTasks (tasks) {
      this.todoSubj.next(tasks);
  }

  public todoSubjObservable () {
    return this.todoSubj.asObservable();
  }

  public setItemByIndex(item, index) {
    this.todosList[index] = item;
    this.getTasks();

  }

  public addTask () {
    this.todosList.push({
      name: 'Пойти на фитнес',
      time: '18.10.2018',
      status: false
    });
  }
}
