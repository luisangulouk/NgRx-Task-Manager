import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { TaskFilterComponent } from './task-filter.component';

describe('TaskFilterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        TaskFilterComponent
      ],
    }).compileComponents();
  }));

  it('should create component', () => {
    const fixture = TestBed.createComponent(TaskFilterComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});