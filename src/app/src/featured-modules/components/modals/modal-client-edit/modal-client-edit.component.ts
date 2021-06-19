import { Component, OnInit,Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientesService } from 'src/app/src/shared/services/clientes/clientes.service';

@Component({
  selector: 'app-modal-client-edit',
  templateUrl: './modal-client-edit.component.html',
  styleUrls: ['./modal-client-edit.component.scss']
})
export class ModalClientEditComponent implements OnInit {
  hide = true;
  public nameFilter!: string;
  userForm= new FormGroup({
    nombre:new FormControl(''),
    apellido:new FormControl(''),
    tipoDocumento:new FormControl(''),
    numDocumento:new FormControl(''),
    sexo:new FormControl(''),
    direcion:new FormControl(''),
    telefono:new FormControl(''),
    distrito:new FormControl(''),
    edad:new FormControl(''),
    email:new FormControl(''),

  });
  constructor( 
    
  @Inject(MAT_DIALOG_DATA) public data:any,
  public dialogRef: MatDialogRef<ModalClientEditComponent>,
  private http: HttpClient,
  private clientesService:ClientesService,) { }

  ngOnInit(): void {
    console.log(this.data);
    this.userForm.patchValue({
      nombre:this.data.NOMBRE,
      apellido:this.data.APELLIDO,
      tipoDocumento:this.data.TIPO_DOCUMENTO,
      numDocumento:this.data.NUM_DOCUMENTO,
      sexo:this.data.SEXO,
      direcion:this.data.DIRECCION,
      telefono:this.data.TELEFONO,
      distrito:this.data.DISTRITO,
      edad:this.data.EDAD,
      email:this.data.EMAIL,
    })
  }
  editClient(event:Event){
    event.preventDefault();
    if (this.userForm.valid) {
      const user = this.userForm.value;
     
    
      user['clienteid']=this.data.ID_CLIENTE;
      console.log(user);
      
      
      this.clientesService.editClients(user)
      .subscribe((response) => {
        console.log(response);
       
        
      });
    }
  }

}
