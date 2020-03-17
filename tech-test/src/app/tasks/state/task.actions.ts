import { Task } from '../task';

/* NgRx */
import { Action } from '@ngrx/store';

export enum TaskActionTypes {
  ToggleTaskCode = '[Task] Toggle Task Code',
  SetCurrentTask = '[Task] Set Current Task',
  ClearCurrentTask = '[Task] Clear Current Task',
  InitializeCurrentTask = '[Task] Initialize Current Task',
  FilterTask = '[Task] Search Task',
  ShowFilteredTasks = '[Task] Show Filtered Tasks',
  Load = '[Task] Load',
  LoadSuccess = '[Task] Load Success',
  LoadFail = '[Task] Load Fail',
  UpdateTask = '[Task] Update Task',
  UpdateTaskSuccess = '[Task] Update Task Success',
  UpdateTaskFail = '[Task] Update Task Fail',
  CreateTask = '[Task] Create Task',
  CreateTaskSuccess = '[Task] Create Task Success',
  CreateTaskFail = '[Task] Create Task Fail',
  DeleteTask = '[Task] Delete Task',
  DeleteTaskSuccess = '[Task] Delete Task Success',
  DeleteTaskFail = '[Task] Delete Task Fail'
}

// Action Creators
export class ToggleTaskCode implements Action {
  readonly type = TaskActionTypes.ToggleTaskCode;

  constructor(public payload: boolean) { }
}

export class ShowFilteredTasks implements Action {
  readonly type = TaskActionTypes.ShowFilteredTasks;

  constructor(public payload: boolean) { }
}

export class SetCurrentTask implements Action {
  readonly type = TaskActionTypes.SetCurrentTask;

  constructor(public payload: Task) { }
}

export class ClearCurrentTask implements Action {
  readonly type = TaskActionTypes.ClearCurrentTask;
}

export class InitializeCurrentTask implements Action {
  readonly type = TaskActionTypes.InitializeCurrentTask;
}

export class FilterTask implements Action {
  readonly type = TaskActionTypes.FilterTask;

  constructor(public payload: string) { }
}

export class Load implements Action {
  readonly type = TaskActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = TaskActionTypes.LoadSuccess;

  constructor(public payload: Task[]) { }
}

export class LoadFail implements Action {
  readonly type = TaskActionTypes.LoadFail;

  constructor(public payload: { error: Error }) { }
}

export class UpdateTask implements Action {
  readonly type = TaskActionTypes.UpdateTask;

  constructor(public payload: Task) { }
}

export class UpdateTaskSuccess implements Action {
  readonly type = TaskActionTypes.UpdateTaskSuccess;

  constructor(public payload: Task) { }
}

export class UpdateTaskFail implements Action {
  readonly type = TaskActionTypes.UpdateTaskFail;

  constructor(public payload: { error: Error }) { }
}

export class CreateTask implements Action {
  readonly type = TaskActionTypes.CreateTask;

  constructor(public payload: Task) { }
}

export class CreateTaskSuccess implements Action {
  readonly type = TaskActionTypes.CreateTaskSuccess;

  constructor(public payload: Task) { }
}

export class CreateTaskFail implements Action {
  readonly type = TaskActionTypes.CreateTaskFail;

  constructor(public payload: { error: Error }) { }
}

export class DeleteTask implements Action {
  readonly type = TaskActionTypes.DeleteTask;

  constructor(public payload: number) { }
}

export class DeleteTaskSuccess implements Action {
  readonly type = TaskActionTypes.DeleteTaskSuccess;

  constructor(public payload: number) { }
}

export class DeleteTaskFail implements Action {
  readonly type = TaskActionTypes.DeleteTaskFail;

  constructor(public payload: { error: Error }) { }
}

// Union the valid types
export type TaskActions = ToggleTaskCode
  | SetCurrentTask
  | ClearCurrentTask
  | InitializeCurrentTask
  | FilterTask
  | ShowFilteredTasks
  | Load
  | LoadSuccess
  | LoadFail
  | UpdateTask
  | UpdateTaskSuccess
  | UpdateTaskFail
  | CreateTask
  | CreateTaskSuccess
  | CreateTaskFail
  | DeleteTask
  | DeleteTaskSuccess
  | DeleteTaskFail