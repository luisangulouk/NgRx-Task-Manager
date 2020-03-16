import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { TaskService } from '../task.service';
import { Task } from '../task';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as taskActions from './task.actions';

@Injectable()
export class TaskEffects {

  constructor(private taskService: TaskService,
              private actions$: Actions) { }

  @Effect()
  loadTasks$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.TaskActionTypes.Load),
    mergeMap(action =>
      this.taskService.getTasks().pipe(
        map(tasks => (new taskActions.LoadSuccess(tasks))),
        catchError(error => of(new taskActions.LoadFail({error})))
      )
    )
  );

  @Effect()
  updateTask$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.TaskActionTypes.UpdateTask),
    map((action: taskActions.UpdateTask) => action.payload),
    mergeMap((task: Task) =>
      this.taskService.updateTask(task).pipe(
        map(updatedTask => (new taskActions.UpdateTaskSuccess(updatedTask))),
        catchError(error => of(new taskActions.UpdateTaskFail({error})))
      )
    )
  );

  @Effect()
  createTask$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.TaskActionTypes.CreateTask),
    map((action: taskActions.CreateTask) => action.payload),
    mergeMap((task: Task) =>
      this.taskService.createTask(task).pipe(
        map(newTask => (new taskActions.CreateTaskSuccess(newTask))),
        catchError(error => of(new taskActions.CreateTaskFail({error})))
      )
    )
  );

  @Effect()
  deleteTask$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.TaskActionTypes.DeleteTask),
    map((action: taskActions.DeleteTask) => action.payload),
    mergeMap((taskId: number) =>
      this.taskService.deleteTask(taskId).pipe(
        map(() => (new taskActions.DeleteTaskSuccess(taskId))),
        catchError(err => of(new taskActions.DeleteTaskFail(err)))
      )
    )
  );
}
