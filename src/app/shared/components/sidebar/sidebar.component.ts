import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) { }

  sidebarData: Array<any> = [
    {
      name: 'Inventry',
      path: '/dashboard/inventry',
      icon: 'icon-house-outline-2'
    },
    {
      name: 'Customers',
      path: '',
      icon: 'icon-approve-user-outline-1'
    },
    {
      name: 'Orders',
      path: '',
      icon: 'icon-cart-outline-1'
    },
    {
      name: 'Transcations',
      path: '',
      icon: 'icon-credit-card-outline-1'
    },
    {
      name: 'Settings',
      path: '',
      icon: 'icon-setting-outline-1'
    },
  ]
  ngOnInit(): void {
  }

  navigationClick(item: string): void {
    this.router.navigate([item]);
  }
}
