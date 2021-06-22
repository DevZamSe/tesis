import { Component, OnInit,Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UsuariosService } from 'src/app/src/shared/services/usuarios/usuarios.service';
@Component({
  selector: 'app-modal-usuario-edit',
  templateUrl: './modal-usuario-edit.component.html',
  styleUrls: ['./modal-usuario-edit.component.scss'],
})
export class ModalUsuarioEditComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<ModalUsuarioEditComponent>,
    private http: HttpClient,
    private usuariosService:UsuariosService,
  ) {}
  hide = true;
  editForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    userType: new FormControl(''),
  });

  ngOnInit(): void {
console.log(this.data);

    this.editForm.patchValue(
{
  username:this.data.USERNAME,
    nombre: this.data.NOMBRE,
    apellido:this.data.APELLIDO,
    userType: this.data.ID_ROL,
})

  }
  editUser(event:Event){
    event.preventDefault();
    if (this.editForm.valid) {
      const user = this.editForm.value;
     
      console.log(this.data.ID_USUARIO);
      user['userid']=this.data.ID_USUARIO;
      console.log(user);
      
      
      this.usuariosService.editUser(user)
      .subscribe((response) => {
        if (response) {
          this.dialogRef.close(true);
        } else {
          this.dialogRef.close(false);
          
        }
       
        
      });
    }
    
  }
}
