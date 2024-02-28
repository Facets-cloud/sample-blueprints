import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  private url = 'http://localhost:5200';
  todoList: {
    _id: string;
    name: string;
    description: string;
    completed: boolean;
  }[] = [];
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getAllTodoList();
  }

  getAllTodoList() {
    this.httpClient.get(`${this.url}/tasks`).subscribe((data: any) => {
      this.todoList = data;
    });
  }
}
