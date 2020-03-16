import { Task } from '../task';
import {
    Load,
    LoadSuccess,
    LoadFail
} from './task.actions';
import { initialState, reducer } from './task.reducer';

describe('Task Reducer', () => {
  const tasks: Task[] = [{
    id: 2,
    label: "Taxes",
    description: "Start doing my taxes and contact my accountant jhon for advice",
    category: "Cat-2",
    done: "01-01-2080"
  }];

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = reducer(undefined, action);

      expect(result).toBe(initialState);
    });

  });

  describe('[Task] Load Tasks', () => {
    it('should toggle loading state', () => {
      const action = new Load();
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState
      });

    });
  });

  describe('[Task] Load Success', () => {
    it('should add tasks to state', () => {
      const action = new LoadSuccess(tasks);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        tasks
      });

    });
  });

  describe('[Task] Load Fail', () => {
    it('should update error in state', () => {
      const error = new Error();
      const action = new LoadFail({error});
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error
      });

    });
  });

});