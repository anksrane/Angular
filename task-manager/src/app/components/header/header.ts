import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public router: Router) {}

  // Helper methods for active route
  isTasksPage(): boolean {
    // return this.router.url === '/tasks';
    return this.router.url.includes('/tasks');
  }

  isAddPage(): boolean {
    // return this.router.url === '/addtask';
    return this.router.url.includes('/addtask') || this.router.url.includes('/edit');
  }  
}
