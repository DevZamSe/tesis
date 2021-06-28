import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './../../../shared/services/auth/login.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-modal-forget-password',
  templateUrl: './modal-forget-password.component.html',
  styleUrls: ['./modal-forget-password.component.scss']
})
export class ModalForgetPasswordComponent implements OnInit {

  constructor(private loginService:LoginService,
    public dialogRef: MatDialogRef<ModalForgetPasswordComponent>,) { }

  ngOnInit(): void {
    
  }
  userForm = new FormGroup({
    username: new FormControl(''),
   
  });


  
  resetPassword(event:Event){
console.log(this.userForm.value);
 
    this.loginService.resetPassword(this.userForm.value).subscribe((response)=>{
      if (response) {
        console.log(response);
        
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
        
      }
    })
  }

}
