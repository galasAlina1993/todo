import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ITodo } from '../models/todo.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class TodoService {
  private bufferSubject: Subject<any> = new Subject<any>();
  private buffer = [];
  private url = `http://localhost:3000`;

  constructor(private http: HttpClient) {}

  public getTasks(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${this.url}/todos`);
  }

  public getTaskById(id): Observable<ITodo> {
    const httpParams: HttpParams = new HttpParams();
    const params = httpParams.set('id', id);
    return this.http.get<ITodo>(`${this.url}/todos`, { params });
  }

  public pasteItems(buffer) {
    // this.todosList.splice(index, 0, ...buffer);
    this.clearBuffer();
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

  public updateItem(item) {
    return this.http.put(`${this.url}/todos/${item.id}`, item);
  }

  public addTask (task) {
    return this.http.post(`${this.url}/todos`, task);
  }

  public deleteItem(id) {
    return this.http.delete(`${this.url}/todos/${id}`);
  }
}
