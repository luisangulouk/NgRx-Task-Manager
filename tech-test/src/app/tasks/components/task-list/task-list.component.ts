import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Task } from '../../task';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnChanges{
  pageTitle = 'Tasks';
  public currentTask: Task[];

  @Input() errorMessage: string;
  @Input() tasks: Task[];
  @Input() filteredTasks: Task[];
  @Input() showFilteredTasks: boolean;
  @Input() displayCode: boolean;
  @Input() selectedTask: Task;
  @Output() checked = new EventEmitter<boolean>();
  @Output() initializeNewTask = new EventEmitter<void>();
  @Output() selected = new EventEmitter<Task>();

  ngOnInit(): void {
    this.currentTask = this.tasks;
  }

  ngOnChanges(): void {
    this.currentTask = this.showFilteredTasks ? this.filteredTasks : this.tasks;
  }

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
