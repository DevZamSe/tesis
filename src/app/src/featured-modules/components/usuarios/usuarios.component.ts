import { ResponseClient } from './../../../shared/interfaces/client';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { authLogin } from 'src/app/src/shared/interfaces/authLogin';
import { ListClient } from 'src/app/src/shared/interfaces/client';
import { LoginService } from 'src/app/src/shared/services/auth/login.service';
import { DateAdapter } from '@angular/material/core';
import { UsuariosService } from './../../../shared/services/usuarios/usuarios.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsuarioEditComponent } from './../modals/modal-usuario-edit/modal-usuario-edit.component';
import { ExportExcelPipe } from 'src/app/src/shared/pipes/exportExcel/export-excel.pipe';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  hide = true;
  public nameFilter!: string;
  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    userType: new FormControl(''),
  });

  public displayedColumns: string[] = [
    'ID',
    'Nombre',
    'Apellido',
    'Fecha de Creación',
    'Opcions',
  ];
  public datos: Array<ResponseClient> = [];
  public dataSource = this.datos;

  public paginator!: MatPaginator;
  public sort!: MatSort;

  constructor(
    private authService: LoginService,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  token: string = 'jdkasjdlakjdlasd###';

  getData() {
    this.authService.listUser().subscribe((datos) => {
      //console.logdatos);
      this.datos = JSON.parse(JSON.stringify(datos))
        .response as Array<ResponseClient>;
      this.dataSource = this.datos;
    });
  }
  saveUser(event: Event) {
    event.preventDefault();
    if (this.userForm.valid) {
      const user = this.userForm.value;
      //console.loguser);

      this.usuariosService.createUser(user).subscribe((response) => {
        //console.logresponse);
        // this.router.navigate(['./admin/products']);
        this.userForm.reset();
        this.getData();
      });
    }
  }

  public applyFilter(): void {
    // this.dataSource.includes(this.nameFilter.toLowerCase());
    this.dataSource = this.datos.filter(
      (i) =>
        i.ID_USUARIO.toString().includes(this.nameFilter.toLowerCase()) ||
        i.NOMBRE.toLowerCase().includes(this.nameFilter.toLowerCase()) ||
        i.APELLIDO.toString().includes(this.nameFilter.toLowerCase()) ||
        i.FECHA_CREACION.toString().includes(this.nameFilter.toLowerCase())
    );
  }

  createNewUser(id: number): ResponseClient {
    return {
      APELLIDO: 'string',
      FECHA_CREACION: 'string',
      ID_ROL: 1,
      ID_USUARIO: 2,
      NOMBRE: 'string',
      USERNAME: 'string',
    };
  }
  deleteUser(id: any) {
    let data = {
      userid: id,
    };
    //console.logdata);
    
    this.usuariosService.deleteUser(data).subscribe((rpta) => {
      
      this.getData();
      // const index = this.dataSource.findIndex((user) => {
      //   user.ID_USUARIO === parseInt(id);
      //   //console.log user.ID_USUARIO);
      //   //console.log id);
      // });
    
      
      // //console.logindex);
      
      // this.dataSource.splice(index, 1);
      // this.dataSource = [...this.dataSource];
    });
  }
  openDialog(row: any) {
    //console.logrow);

    const editModal = this.dialog.open(ModalUsuarioEditComponent, {
      data: row,
      minWidth: '400px',
      maxWidth: '800px',
    });
    editModal.afterClosed().subscribe((result) => {
      result
        ? this.getData()
        : console.log('cancelaste el modal o hubo un error')
    });
  }

  exportexcel() {
    new ExportExcelPipe().transform('usuarios.xlsx', 'excel-usuarios');
  }
}
