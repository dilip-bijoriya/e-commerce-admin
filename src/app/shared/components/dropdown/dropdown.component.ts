import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() dropDownList: any;
  @Output() dropdownChecked = new EventEmitter();

  checkedList: any[];
  currentSelected: {};

  showDropDown: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.checkedList = [];
    console.log(this.dropDownList);
  }

  getSelectedValue(status: Boolean, value: String) {
    if (status) {
      this.checkedList.push(value);
    } else {
      var index = this.checkedList.indexOf(value);
      this.checkedList.splice(index, 1);
    }
    this.currentSelected = { checked: status, name: value };
    this.shareCheckedlist();
  }

  shareCheckedlist() {
    this.dropdownChecked.emit(this.checkedList);
  }
}
