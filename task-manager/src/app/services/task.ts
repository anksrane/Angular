import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../models/task';
import { API_ENDPOINTS } from '../core/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor (private http: HttpClient){}

  // get all tasks
  getTasks(page: number, limit: number): Observable<Task[]> {
    return this.http.get<Task[]>(
      `${API_ENDPOINTS.TASKS}?page=${page}&limit=${limit}`
    );
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${API_ENDPOINTS.TASKS}/${id}`);
  }

  // CREATE TASK
  addTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(API_ENDPOINTS.TASKS, task);
  }

  // UPDATE TASK
  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${API_ENDPOINTS.TASKS}/${id}`, task);
  }

  // DELETE TASK
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINTS.TASKS}/${id}`);
  }  
}
