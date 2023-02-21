import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { UiService } from '../../services/ui.service';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {
    public tasks: Task[] = [];
    public showForm: boolean = false;
    private unsubscriber$ = new Subject<void>();

    constructor(
        private readonly taskService: TaskService,
        private readonly uiService: UiService
    ) {
        this.uiService.onToggleForm()
            .pipe(takeUntil(this.unsubscriber$))
            .subscribe((value: boolean) => {
                this.showForm = value;
            });
    }

    public ngOnInit(): void {
        this.getTasks();
    }

    public ngOnDestroy(): void {
        this.unsubscriber$.next();
        this.unsubscriber$.complete();
    }

    public addTask(task: Task): void {
        this.taskService.add(task)
            .pipe(takeUntil(this.unsubscriber$))
            .subscribe((t: Task) => {
                this.tasks.push(t);
            });
    }

    public toggleCompleted(task: Task): void {
        task.completed = !task.completed;
        this.taskService.update(task)
            .pipe(takeUntil(this.unsubscriber$))
            .subscribe();
    }

    public deleteTask(task: Task): void {
        this.taskService.delete(task)
            .pipe(takeUntil(this.unsubscriber$))
            .subscribe(() => {
                this.tasks = this.tasks.filter((t: Task) => t.id !== task.id);
            });
    }

    public toggleForm(): void {
        this.uiService.toggleFormShown();
    }

    private getTasks(): void {
        this.taskService.getAll()
        .pipe(takeUntil(this.unsubscriber$))
        .subscribe((tasks) => {
            this.tasks = tasks
        });
    }
}
