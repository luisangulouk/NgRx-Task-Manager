import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { taskStatusPipe } from '../shared/task-status.pipe';
import { TaskShellComponent } from './containers/task-shell/task-shell.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/task.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './state/task.effects';

const taskRoutes: Routes = [
  { path: '', component: TaskShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(taskRoutes),
    FormsModule,
    StoreModule.forFeature('tasks', reducer),
    EffectsModule.forFeature(
      [ TaskEffects ]
    ),
  ],
  declarations: [
    taskStatusPipe,
    TaskShellComponent,
    TaskListComponent,
    TaskEditComponent,
    TaskFilterComponent
  ]
})
export class TaskModule { }
