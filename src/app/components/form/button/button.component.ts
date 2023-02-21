import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() color: string = "#aeaeae";
  @Output() clicked: EventEmitter<Event> = new EventEmitter();

  public onClick(e: Event): void {
    this.clicked.emit(e);
  }
}
