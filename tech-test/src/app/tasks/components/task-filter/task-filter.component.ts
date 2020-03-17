import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../task';

@Component({
  selector: 'task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent implements OnInit {
  
  @Input() errorMessage: Error;
  @Input() hasFilter: boolean;
  @Output() search = new EventEmitter<string>();
  @Output() reset = new EventEmitter<boolean>();

  public keySearch: string;

  constructor() { }

  ngOnInit() {
  }

  getTasks(){
    if(this.keySearch){
      this.search.emit(this.keySearch);
    }
  }

  resetFilter(){
    this.keySearch ='';
    this.reset.emit(true);
  }

}
