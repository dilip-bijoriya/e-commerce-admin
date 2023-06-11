import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  productList: Array<any> = [];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.fetchProductData();
  }

  private fetchProductData() {

    this.productService
      .getProductListData()
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.productList = res.response.data
        },
        error: () => {
        },
      });
  }
}
