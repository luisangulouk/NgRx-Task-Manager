import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTasks from './task.reducer';

export interface State {
    tasks: fromTasks.TaskState;
}

// Selector functions
const getTaskFeatureState = createFeatureSelector<fromTasks.TaskState>('tasks');

export const getShowTaskCode = createSelector(
    getTaskFeatureState,
    state => state.showTaskCode
);

export const getCurrentTaskId = createSelector(
    getTaskFeatureState,
    state => state.currentTaskId
);

export const getCurrentTask = createSelector(
    getTaskFeatureState,
    getCurrentTaskId,
    (state, currentTaskId) => {
        if (currentTaskId === 0) {
            return {
                id: 0,
                label: '',
                description:  '',
                category: '',
                done: ''
            };
        } else {
            return currentTaskId ? state.tasks.find(p => p.id === currentTaskId) : null;
        }
    }
);

export const getTasks = createSelector(
    getTaskFeatureState,
    state => state.tasks
);

export const getError = createSelector(
    getTaskFeatureState,
    state => state.error
);
