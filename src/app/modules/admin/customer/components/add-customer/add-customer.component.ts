import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BUTTON_TYPE, LOGIN_TYPE } from 'src/app/modules/auth/components/constant';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  private readonly destroy$: Subject<void> = new Subject();
  form: FormGroup;
  label = BUTTON_TYPE.LABEL;
  type = LOGIN_TYPE.TYPE;
  class = LOGIN_TYPE.CLASS;
  public innerHeight: any;
  initialValue: string = '';
  isDisabled: boolean = false;
  isReadOnly: boolean = false;
  customerId: any;

  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.customerId = this.activatedRoute.snapshot.paramMap.get('customerId');
  }

  ngOnInit() {
    this.form = this.fb.group({});

    this.innerHeight = window.innerHeight - 100;
    if (this.customerId) {
      setTimeout(() => {
        this.getByOneCustomer();
      }, 500);
      this.label = BUTTON_TYPE.UPDATE_LABEL;
    }
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.innerHeight = window.innerHeight - 100;
  }

  onCustomerClick(): void {
    if (this.label === BUTTON_TYPE.UPDATE_LABEL) {
      this.updateCustomer();
    } else {
      this.createCustomer();
    }
  }

  private getByOneCustomer() {
    this.customerService.getByOne(this.customerId).pipe().subscribe({
      next: (res: any) => {
        this.form.get('fname')?.setValue(res.response.name.fname);
        this.form.get('lname')?.setValue(res.response.name.lname);
        this.form.get('email')?.setValue(res.response.email);
        // this.form.get('password')?.setValue(res.response.password);
        this.form.get('phone')?.setValue(res.response.phone);
      },
      error: () => { }
    })
  }

  private get getPayload() {
    const payload = {
      name: {
        fname: this.form.value.fname,
        lname: this.form.value.lname,
      },
      email: this.form.value.email,
      password: this.form.value.password,
      phone: this.form.value.phone,
    }
    return payload;
  }

  private createCustomer(): void {
    if (this.form.valid) {
      this.customerService.createCustomer(this.getPayload).pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: any) => {
            this.toastr.success(res.message);
            this.router.navigate(['/admin/customers/customer']);
          },
          error: (err) => {
            this.toastr.success(err.message);
          },
        });
    } else {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  private updateCustomer(): void {
    if (this.form.valid) {
      this.customerService.updateCustomer(this.getPayload, this.customerId).pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: any) => {
            this.toastr.success(res.message);
            this.router.navigate(['/admin/customers/customer']);
          },
          error: (error) => {
            this.toastr.success(error.message);
          },
        });
    } else {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
