import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit {
  @Input() selected: number = 1;
  @Input() limit: number = 10;
  @Input() total: number = 0;
  @Output() onPaginationChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  getArrayOfPages(total: number, limit: number) {
    const roundOf = Math.ceil(total / limit);
    const arr: number[] = [];
    for (let i = 0; i < roundOf; i++) {
      arr.push(i + 1);
    }
    return arr;
  }

  previousPage() {
    if (this.selected > 1) {
      this.selected--;
      this.onPaginationChange.emit(this.selected);
    }
  }

  nextPage() {
    const totalPages = this.getArrayOfPages(this.total, this.limit).length;
    if (this.selected < totalPages) {
      this.selected++;
      this.onPaginationChange.emit(this.selected);
    }
  }

  public onIndexChange(event: any) {
    const selectedPage = Number(event.target.value) || 1;
    if (selectedPage !== this.selected) {
      this.selected = selectedPage;
      this.onPaginationChange.emit(this.selected);
    }
  }
}