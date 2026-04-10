import { Component, OnInit, signal } from '@angular/core';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task';

import { Subject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports:[CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit{
  // Signal to store tasks
  tasks = signal<Task[]>([]);

  // Filtered data (used in UI)
  filteredTasks = signal<Task[]>([]);  

  // Loading
  isLoading = signal<boolean>(false);

  // Search & Filter streams
  private searchSubject = new Subject<string>();
  private statusSubject = new Subject<string>();  

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
    this.setupFilters();
  }

  // Fetch data from API
  getTasks() {
    this.isLoading.set(true);

    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks.set(data);
        this.filteredTasks.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching tasks', err);
        this.isLoading.set(false);
      }
    });
  }

  // Setup RxJS filtering
  setupFilters() {
    combineLatest([
      this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith('')
      ),
      this.statusSubject.pipe(
        startWith('')
      )
    ]).subscribe(([searchText, status]) => {

      const filtered = this.tasks().filter(task => {

        const matchesSearch =
          task.title.toLowerCase().includes(searchText.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchText.toLowerCase());          

        const matchesStatus =
          status ? task.status === status : true;

        return matchesSearch && matchesStatus;
      });

      this.filteredTasks.set(filtered);
    });
  }

  // Called from UI
  onSearchChange(value: string) {
    this.searchSubject.next(value);
  }

  // Called from UI
  onStatusChange(value: string) {
    this.statusSubject.next(value);
  }  
}