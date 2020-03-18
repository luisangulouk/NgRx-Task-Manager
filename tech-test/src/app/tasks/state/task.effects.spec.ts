import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { TaskService } from '../task.service';
import {
  Load,
  LoadSuccess,
  TaskActions
} from './task.actions';
import { TaskEffects } from './task.effects';
import { Task } from '../task';

describe('Effect: Tasks', () => {
    let actions: Observable<TaskActions>;
    let effects: TaskEffects;
    let service: TaskService;
    const tasks: Task[] = [{
      id: 2,
      label: "Taxes",
      description: "Start doing my taxes",
      category: "Cat-2",
      done: "01-01-2080"
    }];
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [
            TaskEffects,
          provideMockActions(() => actions),
          {
            provide: TaskService,
            useValue: {
              getTasks: jest.fn()
            }
          }
        ]
      });
  
      service = TestBed.get(TaskService);
      effects = TestBed.get(TaskEffects);
    });

    it('should be created', () => {
      expect(effects).toBeTruthy();
    });
  
    describe('load Tasks', () => {
      it('should return a LoadSuccess action, with the tasks, on success', () => {
        const action = new Load();
        const outcome = new LoadSuccess(tasks);
  
        actions = hot('-a', { a: action });
        const response = cold('-a|', { a: tasks });
        const expected = cold('--b', { b: outcome });
        service.getTasks = jest.fn(() => response);
  
        expect(effects.loadTasks$).toBeObservable(expected);
      });

    });

  });