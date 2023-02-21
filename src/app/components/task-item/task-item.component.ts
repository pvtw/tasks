import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() dblclicked: EventEmitter<Task> = new EventEmitter();
  @Output() deleteBtnClicked: EventEmitter<Task> = new EventEmitter();

  public onDblclick(task: Task): void {
    this.dblclicked.emit(task);
  }

  public onDelete(task: Task): void {
    this.deleteBtnClicked.emit(task);
  }
}
