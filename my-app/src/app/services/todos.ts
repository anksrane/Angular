import { inject, Injectable } from '@angular/core';
import { Todo } from '../model/todo.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  // Static array
  // todoItems: Array<Todo> = [
  //   {
  //     title: 'groceries',
  //     id: 0,
  //     userId: 1,
  //     completed: false
  //   },
  //   {
  //     title: 'cars',
  //     id: 1,
  //     userId: 2,
  //     completed: false
  //   },
  // ];

  http = inject(HttpClient)
  //Dynamic array
  getTodosFromURL(){
    const url = `https://jsonplaceholder.typicode.com/todos`;
    // return http
    return this.http.get<Array<Todo>>(url);
  }
}
