import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
  standalone: true,
})
export class TaskForm{

  // Signal for loading state
  isSubmitting = signal<boolean>(false);
  successMessage = signal<string | null>(null)
  // Reactive Form
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: ['pending', Validators.required]
    });
  }

  // Getter for easy access (clean template usage)
  get formControls() {
    return this.taskForm.controls;
  }

  // Submit handler
  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched(); // show errors
      return;
    }

    this.isSubmitting.set(true);

    const formValue = this.taskForm.value;
    const currentTime = new Date().toISOString();

    const payload: Partial<Task> = {
      title: formValue.title,
      description: formValue.description,
      status: formValue.status,
      isDeleted: false,
      isTrashed: false,
      createdAt: currentTime,
      updatedAt: currentTime,
      userId: 'Guest'
    };

    this.taskService.addTask(payload).subscribe({
      next: (res) => {
        console.log('Task created', res);

        // Show success message
        this.successMessage.set('Task added successfully! Redirecting to task...');    


        // reset form
        this.taskForm.reset({
          title: '',
          description: '',
          status: 'pending'
        });

        timer(3000).subscribe(()=>{
          this.isSubmitting.set(false);
          this.successMessage.set("");
          this.router.navigate(['/tasks']);
        })
        // this.isSubmitting.set(false);

        // Redirect after 3 sec   
        // timer(3000).subscribe(()=>{
        //   this.router.navigate(['/tasks']);
        // })
      },
      error: (err) => {
        console.error('Error creating task', err);
        this.isSubmitting.set(false);
      }
    });
  }
}
