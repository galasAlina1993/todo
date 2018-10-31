import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ITodo } from '../models/todo.model';

@Injectable()
export class TodoService {
  private todoSubj: BehaviorSubject<any> = new BehaviorSubject(3);
  private bufferSubject: Subject<any> = new Subject<any>();
  private buffer = [];

  private todosList: ITodo[] = [
    {
      name: 'вынести мусор',
      descr: 'вынести мусор',
      time: '18.10.2018',
      status: false
    },
    {
      name: 'вынести мусор',
      descr: 'вынести мусор',
      time: '18.10.2018',
      status: true
    },
    {
      name: 'вынести мусор',
      descr: 'вынести мусор',
      time: '18.10.2018',
      status: false
    },
    {
      name: 'вынести мусор',
      descr: 'вынести мусор',
      time: '18.10.2018',
      status: true
    }
  ];

  constructor() { }

  public getTasks() {
    return this.fetchTasks(this.todosList);
  }

  public fetchTasks(params) {
      this.todoSubj.next(params);
  }

  public pasteItems(buffer, index) {
    this.todosList.splice(index, 0, ...buffer);
    this.clearBuffer();
    this.getTasks();
  }

  public todoSubjObservable () {
    return this.todoSubj.asObservable();
  }

  public getBufferObservable() {
    return this.bufferSubject.asObservable();
  }

  public updateBuffer(item) {
    this.buffer.push(item);
    this.getBuffer();
  }

  public clearBuffer() {
    this.buffer.length = 0;
    this.getBuffer();
  }

  getBuffer() {
    this.bufferSubject.next(this.buffer);
  }

  public setItemByIndex(item, index) {
    this.todosList[index] = item;
    // this.getTasks();

  }

  public addTask (task) {
    this.todosList.push(task);
  }
}
