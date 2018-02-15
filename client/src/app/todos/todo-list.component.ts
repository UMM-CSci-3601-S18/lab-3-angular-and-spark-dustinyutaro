import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: []
})

export class TodoListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public todos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;

  // TodoListService

 constructor(private todoListService: TodoListService) {

 }

 public filterTodos(searchOwner: string): Todo[] {

   this.filteredTodos = this.todos;

   // Filter by Owner

   if (searchOwner != null) {
     searchOwner = searchOwner.toLocaleLowerCase();

     this.filteredTodos = this.filteredTodos.filter(todo => {
       return !searchOwner || todo.owner.toLowerCase().indexOf(searchOwner) !== -1;
     });
   }

   return this.filteredTodos;
 }


 refreshTodos(): Observable<Todo[]> {


   const todos: Observable<Todo[]> = this.todoListService.getTodos();
   todos.subscribe(
     returnedTodos => {
       this.todos = returnedTodos;
       this.filterTodos(this.todoOwner);
     },
     err => {
       console.log(err);
     });
   return todos;
 }

  ngOnInit(): void {
    this.refreshTodos();
  }


}
