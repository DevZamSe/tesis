import { ResponseClient } from './../../../shared/interfaces/client';
import {  Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { authLogin } from 'src/app/src/shared/interfaces/authLogin';
import { ListClient } from 'src/app/src/shared/interfaces/client';
import { LoginService } from 'src/app/src/shared/services/auth/login.service';
import { DateAdapter } from '@angular/material/core';
import { UsuariosService } from './../../../shared/services/usuarios/usuarios.service';
  import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ModalUsuarioEditComponent } from './../modals/modal-usuario-edit/modal-usuario-edit.component';

/** Constants used to fill up our data base. */
// const FRUITS: string[] = [
//   'blueberry',
//   'lychee',
//   'kiwi',
//   'mango',
//   'peach',
//   'lime',
//   'pomegranate',
//   'pineapple',
// ];
// const NAMES: string[] = [
//   'Maia',
//   'Asher',
//   'Olivia',
//   'Atticus',
//   'Amelia',
//   'Jack',
//   'Charlotte',
//   'Theodore',
//   'Isla',
//   'Oliver',
//   'Isabella',
//   'Jasper',
//   'Cora',
//   'Levi',
//   'Violet',
//   'Arthur',
//   'Mia',
//   'Thomas',
//   'Elizabeth',
// ];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  hide = true;
  public nameFilter!: string;
  userForm= new FormGroup({
    username:new FormControl(''),
    password:new FormControl(''),
  nombre:new FormControl(''),
  apellido:new FormControl(''),
  userType:new FormControl(''),

  });

  public displayedColumns: string[] = [
    'ID',
    'Nombre',
    'Apellido',
    'Fecha de Creación',
    'Opcions'
  ];
  public datos: Array<ResponseClient> = [];
  public dataSource =this.datos;
 

  public paginator!: MatPaginator;
  public sort!: MatSort;
  
  constructor(private authService: LoginService,
    private usuariosService:UsuariosService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getData();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  token:string ="jdkasjdlakjdlasd###";

  getData(){
   this.authService.listUser().subscribe((datos)=>{
    console.log(datos);
    this.datos = JSON.parse(JSON.stringify(datos))
          .response as Array<ResponseClient>;
    this.dataSource=this.datos;
   })
  }
  saveUser(event: Event) {
    event.preventDefault();
    if (this.userForm.valid) {
      const user = this.userForm.value;
      console.log(user);
      
      this.usuariosService.createUser(user)
      .subscribe((response) => {
        console.log(response);
        // this.router.navigate(['./admin/products']);
        this.getData();
      });
    }
  }

  public applyFilter(): void {
    // this.dataSource.includes(this.nameFilter.toLowerCase());
    this.dataSource = this.datos.filter(
      (i) =>
        i.ID_USUARIO.toString().includes(this.nameFilter) ||
        i.NOMBRE.toLowerCase().includes(this.nameFilter) ||
        i.APELLIDO.toString().includes(this.nameFilter) ||
        i.FECHA_CREACION.toString().includes(this.nameFilter)
    );
  }

  createNewUser(id: number): ResponseClient {
    // const name =
    //   NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    //   ' ' +
    //   NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    //   '.';

    return {
      // id: id.toString(),
      // name: name,
      // progress: Math.round(Math.random() * 100).toString(),
      // fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],

      APELLIDO: 'string',
      FECHA_CREACION: 'string',
      ID_ROL: 1,
      ID_USUARIO: 2,
      NOMBRE: 'string',
      USERNAME: 'string',
    };
    
  }
  deleteUser(id:number)
{
  let data={
    userid:id,
  }
  this.usuariosService.deleteUser(data).subscribe(rpta=>{
    console.log(rpta);
    const index = this.dataSource.findIndex((user) =>{user.ID_USUARIO == id;
    console.log(user);
    console.log(user.ID_USUARIO);
    console.log(id);
    } );
    this.dataSource.splice(index, 1);
    this.dataSource = [...this.dataSource];
  } );
}
  // openDialog(){
  //   const editModal=this.dialog.open(ModalUsuarioEditComponent,{  
  //     minWidth: "400px",
  //     maxWidth: "800px",
  //   });
  //   editModal.afterClosed().subscribe((result) => {
  //     result
  //       ? this.getData()
  //       : console.log("cancelaste el modal o hubo un error");
  //   });
  // }
 
}
