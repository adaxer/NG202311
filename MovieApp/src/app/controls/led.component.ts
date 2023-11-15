import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-led',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'led.component.html',
  styles: ``
})
export class LedComponent {
  @Input() color: string = '#4CAF50';  // default to green color
  @Output() colorChanged = new EventEmitter<string>();

  resetColor(): void {
    this.color = "Gray";
    this.colorChanged.emit(this.color);
  }

}
