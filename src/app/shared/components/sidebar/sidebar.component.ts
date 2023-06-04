import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor() { }

  sidebarData: Array<any> = [
    {
      name: 'Inventry',
      path: '',
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
    // $(".logo_for_sidebar").click(function(){
    //   $(".sidebar_wrap").toggleClass("menu-hide submenu-hide");
    // });
    // $(".nav-item").click(function(){
    //   $(".sidebar_wrap").removeClass("menu-hide submenu-hide");
    // });
    // $(".sidebar-sticky li").click(function(){
    //   $("li.active").removeClass("active");
    //   $(this).addClass("active");
    //   $(".sidebar_sub").show();
    // });
    //   $(document).mouseup(function (e) {
    //     var sidebarhide = $(".sidebar_sub");
    //     if (!$('.sidebar_sub').is(e.target) && !sidebarhide.is(e.target) && sidebarhide.has(e.target).length == 0) {
    //       sidebarhide.hide();
    //     }
    //   }); 
  }
}
