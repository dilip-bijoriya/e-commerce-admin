import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  sidebarData: Array<any> = [
    {
      name: 'Inventry',
      path: '/admin/products/product',
      icon: 'icon-buggy-concrete-concrete-trolley-construction-trolley-construction-wheel-barrow-outline-1'
    },
    {
      name: 'Customers',
      path: '/admin/customers/customer',
      icon: 'icon-account-outline-1'
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
  public innerHeight: any;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.innerHeight = window.innerHeight - 100;
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.innerHeight = window.innerHeight - 100;
  }

  class: any
  navigationClick(item: string): void {
    this.router.navigate([item]);
  }

  isLinkActive(path: string): boolean {
    return this.router.isActive(path, true);
  }
}
