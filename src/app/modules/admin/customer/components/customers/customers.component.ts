import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject, filter } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomersComponent implements OnInit {
  customerList: Array<any> = [];
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
    private customerService: CustomerService,
    private CustomModalService: CustomModalService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCustomerList();
    this.innerHeight = window.innerHeight - 240;
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.innerHeight = window.innerHeight - 240;
  }

  private getCustomerList() {
    this.customerService
      .getCustomerListData(this.search.offset, this.search.size, this.search.text)
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.listFound = true;
          this.search.total = res.response.total;
          this.onPagination.next(this.search);
          this.customerList = res.response.data;
          this.search.offset
        },
        error: () => {
          this.listFound = false;
        },
      });
  }

  onPaginationChange(page: number) {
    this.search.offset = page;
    this.getCustomerList();
  }

  onTextChange(event: any) {
    this.search.offset = 1;
    this.search.text = event;
    this.getCustomerList();
  }

  openConfirmModal(customerId: string): void {
    const initialState = {
      headerTitle: 'Delete Customer',
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
      .subscribe(() => this.confirmDelete(customerId));
  }

  confirmDelete(customerId: string): void {
    this.customerService.delete(customerId).pipe()
      .subscribe({
        next: (res: any) => {
          this.bsModalRef.hide();
          this.toastr.success(res.message);
          this.getCustomerList();
        },
        error: (err) => {
          this.toastr.success(err.message);
        }
      });
  }

  editClick(customerId: string) {
    this.router.navigate(['/admin/customers/add-customer', customerId]);
  }
}
