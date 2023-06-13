import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProductComponent implements OnInit {
  form: FormGroup;
  public innerHeight: any;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.innerHeight = window.innerHeight - 240;
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.innerHeight = window.innerHeight - 240;
  }

  submit() {
    if (this.form.valid) {
      return
    } else {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

  }
}
