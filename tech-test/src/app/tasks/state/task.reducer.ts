import { Task } from '../task';
import { TaskActionTypes, TaskActions } from './task.actions';

// State for this feature (Task)
export interface TaskState {
  showTaskCode: boolean;
  currentTaskId: number | null;
  tasks: Task[];
  error: Error;
}

const initialState: TaskState = {
  showTaskCode: true,
  currentTaskId: null,
  tasks: [],
  error: null
};

export function reducer(state = initialState, action: TaskActions): TaskState {

  switch (action.type) {
    case TaskActionTypes.ToggleTaskCode:
      return {
        ...state,
        showTaskCode: action.payload
      };

    case TaskActionTypes.SetCurrentTask:
      return {
        ...state,
        currentTaskId: action.payload.id
      };

    case TaskActionTypes.ClearCurrentTask:
      return {
        ...state,
        currentTaskId: null
      };

    case TaskActionTypes.InitializeCurrentTask:
      return {
        ...state,
        currentTaskId: 0
      };

    case TaskActionTypes.LoadSuccess:
      return {
        ...state,
        tasks: action.payload,
        error: null
      };

    case TaskActionTypes.LoadFail:
      return {
        ...state,
        tasks: [],
        error: action.payload
      };

    case TaskActionTypes.UpdateTaskSuccess:
      const updatedTasks = state.tasks.map(
        item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        tasks: updatedTasks,
        currentTaskId: action.payload.id,
        error: null
      };

    case TaskActionTypes.UpdateTaskFail:
      return {
        ...state,
        error: action.payload
      };

    // After a create, the currentTask is the new task.
    case TaskActionTypes.CreateTaskSuccess:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        currentTaskId: action.payload.id,
        error: null
      };

    case TaskActionTypes.CreateTaskFail:
      return {
        ...state,
        error: action.payload
      };

    // After a delete, the currentTask is null.
    case TaskActionTypes.DeleteTaskSuccess:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        currentTaskId: null,
        error: null
      };

    case TaskActionTypes.DeleteTaskFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
