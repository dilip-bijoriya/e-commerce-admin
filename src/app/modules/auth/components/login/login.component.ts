import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LOGIN_TYPE } from '../constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  label = LOGIN_TYPE.LABEL;
  type = LOGIN_TYPE.TYPE;
  class = LOGIN_TYPE.CLASS;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  submitted = false;
  private readonly destroy$: Subject<void> = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    private authService: ServiceService,
    private router: Router,
    private cookie: CookieService
  ) { }
  get f() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const payload = { ...this.loginForm.value };
    this.authService
      .loginAction(payload)
      .pipe()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.cookie.set('blue_basket', JSON.stringify(res));
          this.router.navigate(['/admin']);
        },
        error: (error) => { },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
