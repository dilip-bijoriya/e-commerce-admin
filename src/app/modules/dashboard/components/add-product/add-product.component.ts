import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { BUTTON_TYPE, LOGIN_TYPE } from 'src/app/modules/auth/components/constant';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProductComponent implements OnInit {
  form: FormGroup;
  label = BUTTON_TYPE.LABEL;
  type = LOGIN_TYPE.TYPE;
  class = LOGIN_TYPE.CLASS;
  public innerHeight: any;
  initialValue: string = '';
  isDisabled: boolean = false;
  isReadOnly: boolean = false;
  productId: any;
  uploadedFiles: File[] = [];
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId');
  }

  ngOnInit() {
    this.form = this.fb.group({});

    this.innerHeight = window.innerHeight - 100;
    if (this.productId) {
      this.getByOneProduct();
      this.label = BUTTON_TYPE.UPDATE_LABEL;
    }
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.innerHeight = window.innerHeight - 100;
  }

  private getByOneProduct() {
    this.productService.getByOne(this.productId).pipe().subscribe({
      next: (res: any) => {
        this.uploadedFiles = res.response.image;
        this.form.get('name')?.setValue(res.response.name);
        this.form.get('category')?.setValue(res.response.category);
        this.form.get('description')?.setValue(res.response.description);
        this.form.get('price')?.setValue(res.response.price);
        this.form.get('inventry')?.setValue(res.response.inventry);
        this.form.get('tags')?.setValue(res.response.tags);

      },
      error: () => { }
    })
  }

  onProductClick() {
    if (this.label === BUTTON_TYPE.UPDATE_LABEL) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  private createProduct(): void {
    if (this.form.valid) {
      return console.log(this.form.value);
    } else {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  private updateProduct(): void {
    console.log('update');
  }

  onFilesUploaded(files: File[]) {
    this.uploadedFiles = files;
    console.log(this.uploadedFiles);
  }
}
