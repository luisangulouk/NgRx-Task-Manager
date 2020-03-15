import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromTasks from './task.reducer';

// Extends the app state to include the task feature.
// This is required because tasks are lazy loaded.
// So the reference to TaskState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
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
