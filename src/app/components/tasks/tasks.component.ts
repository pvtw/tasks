import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public tasks: Task[] = [];
  public showForm: boolean = false;
  public subscription: Subscription;
  
  constructor(
    private readonly taskService: TaskService,
    private readonly uiService: UiService
  ) {
    this.subscription = this.uiService.onToggleForm().subscribe(value => {
      this.showForm = value;
    });
  }

  public ngOnInit(): void {
    this.taskService.getAll().subscribe((tasks) => {
      this.tasks = tasks
    });
  }

  public addTask(task: Task): void {
    this.taskService.add(task).subscribe(t => {
      this.tasks.push(t);
    });
  }

  public toggleCompleted(task: Task): void {
    task.completed = !task.completed;
    this.taskService.update(task).subscribe();
  }

  public deleteTask(task: Task): void {
    this.taskService.delete(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    });
  }

  public toggleForm(): void {
    this.uiService.toggleFormShown();
  }
}
