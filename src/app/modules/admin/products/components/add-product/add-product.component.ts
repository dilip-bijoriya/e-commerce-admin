import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BUTTON_TYPE, LOGIN_TYPE } from 'src/app/modules/auth/components/constant';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProductComponent implements OnInit {
  private readonly destroy$: Subject<void> = new Subject();
  form: FormGroup;
  label = BUTTON_TYPE.LABEL;
  type = LOGIN_TYPE.TYPE;
  class = LOGIN_TYPE.CLASS;
  public innerHeight: any;
  initialValue: string = '';
  isDisabled: boolean = false;
  isReadOnly: boolean = false;
  productId: any;
  uploadedImages: string[] = [];
  dropdownList: any;
  dropdownSettings: any;

  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId');
  }

  ngOnInit() {
    this.getGroupList();
    this.form = this.fb.group({
      image: [''],
      tags: ['', [Validators.required]]
    });

    this.innerHeight = window.innerHeight - 100;
    if (this.productId) {
      setTimeout(() => {
        this.getByOneProduct();
      }, 500);
      this.label = BUTTON_TYPE.UPDATE_LABEL;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.innerHeight = window.innerHeight - 100;
  }

  private getGroupList() {
    this.productService.getGroupList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.dropdownList = res.response.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  private getByOneProduct() {
    this.productService.getByOne(this.productId).pipe().subscribe({
      next: (res: any) => {
        const idArray = res.response.tags;
        const matchedGroups = this.dropdownList?.filter((group: any) => idArray.includes(group._id));
        res.response.tags = matchedGroups;
        this.form.value.tags = matchedGroups;
        this.uploadedImages = res.response.image;
        this.form.get('name')?.setValue(res.response.name);
        this.form.get('category')?.setValue(res.response.category);
        this.form.get('description')?.setValue(res.response.description);
        this.form.get('price')?.setValue(res.response.price);
        this.form.get('inventry')?.setValue(res.response.inventry);
        this.form.get('tags')?.setValue(res?.response?.tags);
      },
      error: () => { }
    })
  }

  onProductClick(): void {
    if (this.label === BUTTON_TYPE.UPDATE_LABEL) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  private createProduct(): void {
    // const idArray = this.form.value.tags.map((item: any) => item._id);
    // this.form.value.tags = idArray;
    if (this.form.valid) {
      this.form.value.image = this.uploadedImages;
      const payload = this.form.value
      this.productService.createProduct(payload).pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: any) => {
            this.toastr.success(res.message);
            this.router.navigate(['/admin/products/product']);
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

  private updateProduct(): void {
    if (this.form.valid) {
      this.form.value.image = this.uploadedImages;
      const payload = this.form.value
      this.productService.updateProduct(payload, this.productId).pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: any) => {
            this.toastr.success(res.message);
            this.router.navigate(['/admin/products/product']);
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

  onFilesUploaded(files: string[]) {
    this.uploadedImages = files;
  }
}
