import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() label: string;
  @Input() controlName: string;
  @Input() parentForm: FormGroup;
  @Input() placeholder: string;
  @Input() id: string;

  get control() {
    return this.parentForm.get(this.controlName) as FormControl;
  }

  constructor() { }

  ngOnInit() {
    this.parentForm.addControl(
      this.controlName,
      new FormControl('', Validators.required)
    );
  }

}
