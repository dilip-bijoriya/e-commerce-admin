import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string;
  @Input() class: string;
  @Input() type: string;
  @Input() disabled: boolean = false;

  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  onClick(): void {
    this.clicked.emit();
  }
}
