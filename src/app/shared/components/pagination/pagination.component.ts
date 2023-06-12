import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { PagerService } from '../../services/pagination.service';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit {
  @Input() offset: number
  @Input() size: number
  @Input() total: number
  @Output() onPaginationChange = new EventEmitter<any>();
  @Input() onPerameterChange: Subject<any>

  public page: any
  constructor() { }

  ngOnInit() {
    this.changePages()
    if (this.onPerameterChange) {
      this.onPerameterChange.subscribe(data => {
        if (data && data.total) {
          // this.changePages()
          if (this.total != data.total) {
            this.total = data.total
            this.page = PagerService.getPager(this.total, this.offset, this.size)
            // console.log(this.page);
          }
        }
      })
    }
  }
  changePages() {
    this.page = PagerService.getPager(this.total, this.offset, this.size)
    this.onPaginationChange.emit(this.page)
  }
  public onIndexChange(item: any, index: any) {
    this.offset = item
    this.changePages()
  }
}