import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  authLogin,
  responseLogin,
} from 'src/app/src/shared/interfaces/authLogin';
import { LoginService } from 'src/app/src/shared/services/auth/login.service';
import {ModalForgetPasswordComponent} from './../modal-forget-password/modal-forget-password.component'
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private authService: LoginService,
     private route: Router,
     public dialog: MatDialog) {}

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
  modal(){
   

    const editModal = this.dialog.open(ModalForgetPasswordComponent, {
      minWidth: '400px',
      maxWidth: '800px',
    });
    editModal.afterClosed().subscribe((result) => {
      result
        ? location.reload()
        : console.log('cancelaste el modal o hubo un error');
    });
  }
}
