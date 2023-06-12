import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subject, takeUntil } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InventoryComponent implements OnInit {
  productList: Array<any> = [];
  public onPagination = new Subject();
  listFound: boolean;
  public innerHeight: any;
  public search = {
    text: '',
    size: 10,
    offset: 0,
    total: 0,
  };
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.fetchProductData();
    this.innerHeight = window.innerHeight - 240;
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.innerHeight = window.innerHeight - 240;
  }

  private fetchProductData() {
    let offset = this.search.size * this.search.offset;
    this.productService
      .getProductListData(offset, this.search.size, this.search.text)
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.listFound = true;
          this.search.total = res.response.total;
          this.onPagination.next(this.search);
          this.productList = res.response.data;
        },
        error: () => {
          this.listFound = false;
        },
      });
  }

  onPaginationChange(event: any) {
    this.search.offset = event.currentPage - 1;
    this.fetchProductData();
  }

  onTextChange(event: any) {
    this.search.offset = 0;
    this.search.text = event;
    this.fetchProductData();
  }
}
