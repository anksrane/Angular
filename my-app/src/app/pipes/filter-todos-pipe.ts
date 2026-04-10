import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../model/todo.type';
import { filter } from 'rxjs';

@Pipe({
  name: 'filterTodos',
})
export class FilterTodosPipe implements PipeTransform {
  transform(todos: Todo[], searchTerm: string): Todo[] {
    if(!searchTerm){
      return todos;
    }
    const text= searchTerm.toLowerCase();
    return todos.filter(todo => {
      return todo.title.toLowerCase().includes(text);
    })
  }
}
