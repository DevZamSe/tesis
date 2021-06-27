import { LoginService } from './../../../shared/services/auth/login.service';
import { Component, OnInit } from '@angular/core';
import { admin, client, superadmin } from 'src/app/src/shared/data/layout';
import { permission } from 'src/app/src/shared/interfaces/authLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public data: Array<permission> = [];
  public now: number = 0;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    const value = sessionStorage.getItem('view');
    switch (parseInt(`${sessionStorage.getItem('view')}`)) {
      case 2:
        this.data = admin;
        this.now = admin[0].id;
        break;
      case 3:
        this.data = client;
        this.now = client[0].id;
        break;
      default:
        this.data = superadmin;
        this.now = superadmin[0].id;
        break;
    }
  }

  nowClick(data: number): void {
    this.now = data;
    if (data === 8) {
      this.loginService.logout();
      this.router.navigate(['/']);
    }
  }
}
