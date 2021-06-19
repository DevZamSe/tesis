import { LoginService } from './../../../shared/services/auth/login.service';
import { Component, OnInit } from '@angular/core';
import { superadmin } from 'src/app/src/shared/data/layout';
import { permission } from 'src/app/src/shared/interfaces/authLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public data: Array<permission> = superadmin;
  public now: number = superadmin[0].id;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  nowClick(data: number): void {
    this.now = data;
    if (data === 8) {
      this.loginService.logout();
      this.router.navigate(['/']);
    }
  }
}
