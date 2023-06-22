import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(private cookie: CookieService, private router: Router) { }
  ngOnInit(): void {
    const userData = this.cookie.get('blue_basket');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.response && user.response.data) {
          this.router.navigate(['/admin/products/product']);
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    } else {
      console.error('No JSON data found.');
    }
  }
}
