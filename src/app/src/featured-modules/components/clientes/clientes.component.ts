import { ExportExcelPipe } from './../../../shared/pipes/exportExcel/export-excel.pipe';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ResponseClient } from './../../../shared/interfaces/clientes';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ClientesService } from 'src/app/src/shared/services/clientes/clientes.service';
import { ModalClientEditComponent } from '../modals/modal-client-edit/modal-client-edit.component';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  hide = true;
  public nameFilter!: string;
  userForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    tipoDocumento: new FormControl(''),
    numDocumento: new FormControl(''),
    sexo: new FormControl(''),
    direcion: new FormControl(''),
    telefono: new FormControl(''),
    distrito: new FormControl(''),
    edad: new FormControl(''),
    email: new FormControl(''),
  });
  public displayedColumns: string[] = [
    'NOMBRE',
    'APELLIDO',
    'TIPO_DOCUMENTO',
    'NUM_DOCUMENTO',
    'SEXO',
    'DIRECCION',
    'DISTRITO',
    'TELEFONO',
    'EDAD',
    'EMAIL',
    'ID_CLIENTE',
    'OPCIONES',
  ];
  public datos: Array<ResponseClient> = [];
  public dataSource = this.datos;

  public paginator!: MatPaginator;
  public sort!: MatSort;

  constructor(
    private clientesService: ClientesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.clientesService.listClients().subscribe((datos) => {
      console.log(datos);
      this.datos = JSON.parse(JSON.stringify(datos))
        .response as Array<ResponseClient>;
      this.dataSource = this.datos;
    });
  }
  saveUser(event: Event) {
    event.preventDefault();
    if (this.userForm.valid) {
      const client = this.userForm.value;
      console.log(client);

      this.clientesService.addClients(client).subscribe((response) => {
        console.log(response);
        // this.router.navigate(['./admin/products']);
        this.userForm.reset();
        this.getData();
      });
    }
  }
  applyFilter(): void {
    // this.dataSource.includes(this.nameFilter.toLowerCase());
    this.dataSource = this.datos.filter(
      (i) =>
        i.nombre.toString().includes(this.nameFilter) ||
        i.apellido.toLowerCase().includes(this.nameFilter) ||
        i.tipoDocumento.toString().includes(this.nameFilter) ||
        i.sexo.toString().includes(this.nameFilter) ||
        i.direcion.toString().includes(this.nameFilter) ||
        i.distrito.toString().includes(this.nameFilter) ||
        i.telefono.toString().includes(this.nameFilter) ||
        i.edad.toString().includes(this.nameFilter) ||
        i.email.toString().includes(this.nameFilter) ||
        i.numDocumento.toString().includes(this.nameFilter)
    );
  }
  deleteUser(id: number): void {
    let data = {
      clientid: id,
    };
    this.clientesService.deleteClients(data).subscribe((rpta) => {
      console.log(rpta);
      const index = this.dataSource.findIndex((user) => {
        user.id_cliente == id;
      });
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    });
  }
  openDialog(row: any): void {
    console.log(row);

    const editModal = this.dialog.open(ModalClientEditComponent, {
      data: row,
      minWidth: '400px',
      maxWidth: '800px',
    });
    editModal.afterClosed().subscribe((result) => {
      result
        ? this.getData()
        : console.log('cancelaste el modal o hubo un error');
    });
  }
  exportexcel() {
    new ExportExcelPipe().transform('clientes.xlsx', 'excel-table');
  }
}
