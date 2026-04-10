import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { HighlightCompletedTodo } from '../directives/highlight-completed-todo';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos-pipe';

@Component({
  selector: 'app-todos-component',
  imports: [HighlightCompletedTodo, FormsModule, FilterTodosPipe],
  templateUrl: './todos-component.html',
  styleUrl: './todos-component.css',
})
export class TodosComponent implements OnInit {
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);
  searchTerm = signal('');

  ngOnInit(): void {
    // when static array
    // console.log(this.todoService.todoItems);
    // this.todoItems.set(this.todoService.todoItems);

    // when from api
    this.todoService
      .getTodosFromURL()
      .pipe(
        catchError((err) =>{
          console.error(err);
          throw err;
        })
      )
      .subscribe((todos) => {
        this.todoItems.set(todos);
      })
  }

  onToggle(todo: Todo, isChecked: boolean) {
    // update object
    todo.completed = isChecked;
  }
}
