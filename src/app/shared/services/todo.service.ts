import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ITodo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TodoService {
  private todoSubj: BehaviorSubject<any> = new BehaviorSubject(3);
  private bufferSubject: Subject<any> = new Subject<any>();
  private buffer = [];
  private url = `http://localhost:3000`;

  private todosList: ITodo[] = [
    {
      id: 1,
      name: 'вынести мусор',
      descr: 'вынести мусор',
      time: '18.10.2018',
      status: false
    },
    {
      id: 2,
      name: 'вынести мусор',
      descr: 'вынести мусор',
      time: '18.10.2018',
      status: true
    },
    {
      id: 3,
      name: 'вынести мусор',
      descr: 'вынести мусор',
      time: '18.10.2018',
      status: false
    },
    {
      id: 4,
      name: 'вынести мусор',
      descr: 'вынести мусор',
      time: '18.10.2018',
      status: true
    }
  ];

  constructor(private http: HttpClient) {}

  public getTasks() {
    // return this.http.get(`${this.url}/todos`);
    return this.fetchTasks(this.todosList);
  }

  public getTaskById(id): ITodo {
    return this.todosList.find(e => e.id === +id) || <ITodo>{};
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
    this.todosList.push({id: this.todosList.length, ...task});
  }
}
