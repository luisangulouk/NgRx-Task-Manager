import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Task } from '../../task';
import { GenericValidator } from '../../../shared/generic-validator';
import { NumberValidators } from '../../../shared/number.validator';

@Component({
  selector: 'task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit, OnChanges, OnDestroy {
  pageTitle = 'Task Edit';
  @Input() errorMessage: Error;
  @Input() selectedTask: Task;
  @Output() create = new EventEmitter<Task>();
  @Output() update = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  @Output() clearCurrent = new EventEmitter<void>();

  componentActive = true;
  taskForm: FormGroup;

  task: Task | null;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      taskLabel: {
        required: 'Task name is required.',
        minlength: 'Task name must be at least three characters.',
        maxlength: 'Task name cannot exceed 50 characters.'
      },
      taskId: {
        required: 'Task code is required.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.taskForm = this.fb.group({
      label: ['', [Validators.required,
                         Validators.minLength(1),
                         Validators.maxLength(50)]],
      id: ['', Validators.required],
      category: '',
      description: '',
      done: ''
    });

    // Watch for value changes
    this.taskForm.valueChanges.subscribe(
      value => this.displayMessage = this.genericValidator.processMessages(this.taskForm)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {

    // patch form with value from the store
    if (changes.selectedTask) {
      const task: any = changes.selectedTask.currentValue as Task;
      this.displayTask(task);
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.taskForm);
  }

  displayTask(task: Task | null): void {
    // Set the local task property
    this.task = task;

    if (this.task && this.taskForm) {
      // Reset the form back to pristine
      this.taskForm.reset();

      // Display the appropriate page title
      if (this.task.id === 0) {
        this.pageTitle = 'Add Task';
      } else {
        this.pageTitle = `Edit Task: ${this.task.label}`;
      }

      // Update the data on the form
      this.taskForm.patchValue({
        label: this.task.label,
        id: this.task.id,
        category: this.task.category,
        description: this.task.description,
        done: this.task.done
      });
    }
  }

  cancelEdit(): void {
    // Redisplay the currently selected task
    // replacing any edits made
    this.displayTask(this.task);
  }

  deleteTask(): void {
    if (this.task && this.task.id) {
      if (confirm(`Really delete the task: ${this.task.label}?`)) {
        this.delete.emit(this.task);
      }
    } else {
      // No need to delete, it was never saved
      this.clearCurrent.emit();
    }
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      if (this.taskForm.dirty) {
        const p = { ...this.task, ...this.taskForm.value };

        if (p.id === 0) {
          this.create.emit(p);
        } else {
          this.update.emit(p);
        }
      }
    } else {
      this.errorMessage = new Error('Ops seems like something went wrong while updating the task!');
    }
  }

}
