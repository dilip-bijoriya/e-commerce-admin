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
  @Input() selected: number = 1
  @Input() limit: number = 10
  @Input() total: number = 0
  @Output() onPaginationChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    console.log({
      selected: this.selected,
      limit: this.limit,
      total: this.total
    })
  }

  getArrayOfPages(total: number, limit: number) {
    const roundOf = Math.ceil(total / limit);
    const arr: number[] = [];
    for (let i = 0; i < roundOf; i++) {
      arr.push(i + 1)
    }
    return arr;
  }

  public onIndexChange(event: any) {
    this.onPaginationChange.emit(Number(event.target.value) || 1)
  }
}