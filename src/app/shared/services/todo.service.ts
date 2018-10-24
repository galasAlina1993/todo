import {Injectable} from '@angular/core';

@Injectable()
export class TodoService {
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
    return this.todosList;
  }

  public addTask () {
    this.todosList.push({
      name: 'Пойти на фитнес',
      time: '18.10.2018',
      status: false
    });
  }
}
