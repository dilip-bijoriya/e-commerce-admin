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
  constructor(private router: Router) { }
  public innerHeight: any;

  sidebarData: Array<any> = [
    {
      name: 'Inventry',
      path: '/dashboard/inventry',
      icon: 'icon-buggy-concrete-concrete-trolley-construction-trolley-construction-wheel-barrow-outline-1'
    },
    {
      name: 'Customers',
      path: '',
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

  ngOnInit(): void {
    this.innerHeight = window.innerHeight - 100;
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.innerHeight = window.innerHeight - 100;
  }

  navigationClick(item: string): void {
    this.router.navigate([item]);
  }
}
