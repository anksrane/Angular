import { Component, OnInit, signal } from '@angular/core';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task';

import { Subject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

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

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  onEdit(id:string){
    this.router.navigate(['/edit',id]);
  }

  ngOnInit(): void {
    this.getTasks();
    this.setupFilters();
  }
  
  onDelete(task: Task) {

    const confirmDelete = confirm(`Are you sure you want to delete "${task.title}"?`);

    if (!confirmDelete) return;

    const updatedPayload: Partial<Task> = {
      isDeleted: true,
      updatedAt: new Date().toISOString()
    };

    this.taskService.updateTask(task.id, updatedPayload).subscribe({
      next: () => {

        // ✅ Remove from UI instantly (no reload)
        const updatedList = this.tasks().filter(t => t.id !== task.id);

        this.tasks.set(updatedList);
        this.filteredTasks.set(updatedList);

      },
      error: (err) => {
        console.error('Error deleting task', err);
      }
    });
  }  

  // Fetch data from API
  getTasks() {
    this.isLoading.set(true);

    this.taskService.getTasks().subscribe({
      next: (data) => {

        const activeTasks = data.filter(task => !task.isDeleted);

        this.tasks.set(activeTasks);
        this.filteredTasks.set(activeTasks);

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