import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const newTask = { ...task, id: null };
    return this.http.post<Task>(this.tasksUrl, newTask, { headers })
      .pipe(
        tap(data => console.log('createTask: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteTask(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete<Task>(url, { headers })
      .pipe(
        tap(data => console.log('deleteTask: ' + id)),
        catchError(this.handleError)
      );
  }

  updateTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http.patch<Task>(url, task, { headers })
      .pipe(
        tap(() => console.log('updateTask: ' + task.id)),
        // Return the task on an update
        map(() => task),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    let errorMessage: Error;
    if (err.error instanceof ErrorEvent) {
      errorMessage = new Error(`An error occurred: ${err.error.message}`);
    } else {
      errorMessage = new Error(`Backend returned code ${err.status}: ${err.body.error}`);
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
