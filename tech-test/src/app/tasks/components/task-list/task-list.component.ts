import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../task';

@Component({
  selector: 'pm-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  pageTitle = 'Tasks';

  @Input() errorMessage: string;
  @Input() tasks: Task[];
  @Input() displayCode: boolean;
  @Input() selectedTask: Task;
  @Output() checked = new EventEmitter<boolean>();
  @Output() initializeNewTask = new EventEmitter<void>();
  @Output() selected = new EventEmitter<Task>();

  checkChanged(value: boolean): void {
    this.checked.emit(value);
  }

  newTask(): void {
    this.initializeNewTask.emit();
  }

  taskSelected(task: Task): void {
    this.selected.emit(task);
  }

}
