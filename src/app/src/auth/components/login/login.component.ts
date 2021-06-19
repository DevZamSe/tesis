import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  authLogin,
  responseLogin,
} from 'src/app/src/shared/interfaces/authLogin';
import { LoginService } from 'src/app/src/shared/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public data: authLogin = {
    username: '',
    password: '',
  };

  constructor(private authService: LoginService, private route: Router) {}

  ngOnInit(): void {}

  enviar(): void {
    this.authService.login(this.data).subscribe(
      (data) => {
        this.authService.onSave(data);
        this.route.navigate([`dashboard`]);
      },
      (error: Error) => {
        console.log(error);
        // this.route.navigate([``]);
        window.location.reload;
      }
    );
  }
}
