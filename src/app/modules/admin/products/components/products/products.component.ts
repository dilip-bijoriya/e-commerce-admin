import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject, filter } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {
  productList: Array<any> = [];
  public onPagination = new Subject();
  listFound: boolean;
  public innerHeight: any;
  bsModalRef!: BsModalRef;
  public search = {
    text: '',
    size: 10,
    offset: 1,
    total: 0,
  };

  constructor(
    private productService: ProductService,
    private CustomModalService: CustomModalService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.fetchProductData();
    this.innerHeight = window.innerHeight - 240;
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.innerHeight = window.innerHeight - 240;
  }

  private fetchProductData() {
    this.productService
      .getProductListData(this.search.offset, this.search.size, this.search.text)
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.listFound = true;
          this.search.total = res.response.total;
          this.onPagination.next(this.search);
          this.productList = res.response.data;
          this.search.offset;
        },
        error: (err) => {
          console.log(err);
          this.listFound = false;
        },
      });
  }

  onPaginationChange(page: number) {
    this.search.offset = page;
    this.fetchProductData();
  }

  onTextChange(event: any) {
    this.search.offset = 1;
    this.search.text = event;
    this.fetchProductData();
  }

  openConfirmModal(productId: string): void {
    const initialState = {
      headerTitle: 'Delete Product',
      confirmMessage: 'Are you sure you want to proceed?'
    };
    this.bsModalRef = this.CustomModalService.show(ModalConfirmComponent, {
      initialState,
      class: 'modal-dialog--xs'
    });
    this.bsModalRef.content.onClose$
      .pipe(
        filter((result: boolean) => result)
      )
      .subscribe(() => this.confirmDelete(productId));
  }

  confirmDelete(productId: string): void {
    this.productService.delete(productId).pipe()
      .subscribe({
        next: (res: any) => {
          this.bsModalRef.hide();
          this.toastr.success(res.message);
          this.fetchProductData();
        },
        error: (err) => {
          this.toastr.success(err.message);
        }
      });
  }

  editClick(productId: string) {
    this.router.navigate(['/admin/products/add-product', productId, 'update']);
  }
}
