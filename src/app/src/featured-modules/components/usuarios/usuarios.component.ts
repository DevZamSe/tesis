import { ResponseClient } from './../../../shared/interfaces/client';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { authLogin } from 'src/app/src/shared/interfaces/authLogin';
import { ListClient } from 'src/app/src/shared/interfaces/client';
import { LoginService } from 'src/app/src/shared/services/auth/login.service';
import { DateAdapter } from '@angular/material/core';

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
  public displayedColumns: string[] = [
    'ID',
    'Nombre',
    'Apellido',
    'Fecha de Creación',
  ];
  public dataSource!: MatTableDataSource<ListClient>;
  public data: Array<ResponseClient> = [];

  public paginator!: MatPaginator;
  public sort!: MatSort;

  constructor(private authService: LoginService) {}

  ngOnInit(): void {
    this.getData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getData(): void {
    this.authService.listUser().subscribe(
      (data) => {
        // this.data = data['response'];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
}
