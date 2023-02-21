import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Task } from '../../interfaces/task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnDestroy {
  @Output() submitted: EventEmitter<Task> = new EventEmitter();

  public title: string = "";
  public completed: boolean = false;
  public subscription: Subscription;

  constructor(
    private readonly uiService: UiService
  ) {
    this.subscription = this.uiService.onToggleForm().subscribe(value => {
      if (!value) {
        this.clearForm();
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSubmit(): void {
    const task: Task = {
      id: Math.floor(Math.random() * 100000),
      title: this.title,
      completed: this.completed
    };

    this.submitted.emit(task);

    this.clearForm();
  }

  private clearForm(): void {
    this.title = "";
    this.completed = false;
  }
}
