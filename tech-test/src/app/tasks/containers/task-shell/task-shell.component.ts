import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromTask from './../../state';
import * as taskActions from './../../state/task.actions';
import { Task } from '../../task';

@Component({
  templateUrl: './task-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskShellComponent implements OnInit {
  displayCode$: Observable<boolean>;
  selectedTask$: Observable<Task>;
  tasks$: Observable<Task[]>;
  filteredTasks$: Observable<Task[]>;
  showFilteredTasks$: Observable<boolean>;
  errorMessage$: Observable<Error>;

  constructor(private store: Store<fromTask.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new taskActions.Load());
    this.tasks$ = this.store.pipe(select(fromTask.getTasks));
    this.filteredTasks$ = this.store.pipe(select(fromTask.getFilteredTasks));
    this.showFilteredTasks$ = this.store.pipe(select(fromTask.getShowFilteredTasks));
    this.errorMessage$ = this.store.pipe(select(fromTask.getError));
    this.selectedTask$ = this.store.pipe(select(fromTask.getCurrentTask));
    this.displayCode$ = this.store.pipe(select(fromTask.getShowTaskCode));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new taskActions.ToggleTaskCode(value));
  }

  newTask(): void {
    this.store.dispatch(new taskActions.InitializeCurrentTask());
  }

  taskSelected(task: Task): void {
    this.store.dispatch(new taskActions.SetCurrentTask(task));
  }

  deleteTask(task: Task): void {
    this.store.dispatch(new taskActions.DeleteTask(task.id));
  }

  clearTask(): void {
    this.store.dispatch(new taskActions.ClearCurrentTask());
  }

  saveTask(task: Task): void {
    this.store.dispatch(new taskActions.CreateTask(task));
  }

  updateTask(task: Task): void {
    this.store.dispatch(new taskActions.UpdateTask(task));
  }

  filterTask(taskLabel: string): void {
    this.store.dispatch(new taskActions.FilterTask(taskLabel));
    this.store.dispatch(new taskActions.ShowFilteredTasks(true));
  }

  resetFilter(e: Event): void {
    this.store.dispatch(new taskActions.ShowFilteredTasks(false));
  }
}
