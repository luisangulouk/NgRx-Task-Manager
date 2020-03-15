import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/task.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './state/task.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('tasks', reducer),
    EffectsModule.forFeature(
      [ TaskEffects ]
    ),
  ],
  declarations: [
  ]
})
export class TaskModule { }
