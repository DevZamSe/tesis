import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-modal-usuario-edit',
  templateUrl: './modal-usuario-edit.component.html',
  styleUrls: ['./modal-usuario-edit.component.scss']
})
export class ModalUsuarioEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalUsuarioEditComponent>,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

}
