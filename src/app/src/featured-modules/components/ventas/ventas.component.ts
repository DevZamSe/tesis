import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/src/shared/services/ventas/ventas.service';
import { SalesList } from './../../../shared/interfaces/ventas';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExportExcelPipe } from 'src/app/src/shared/pipes/exportExcel/export-excel.pipe';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  hide = true;
  public nameFilter!: string;
  public displayedColumns: string[] = [
    'ID_CLIENTE',
    'ID_PRODUCTO',
    'ID_VENTA',
    'CANTIDAD',
    'FECHA',
    'MONTO',
    'OPCIONES',
  ];
  userForm = new FormGroup({
    clientid: new FormControl(''),
    productid: new FormControl(''),
    cantidad: new FormControl(''),
  });
  public datos: Array<SalesList> = [];
  public dataSource = this.datos;

  public paginator!: MatPaginator;
  public sort!: MatSort;
  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.ventasService.list().subscribe((datos) => {
      this.datos = JSON.parse(JSON.stringify(datos))
        .response as Array<SalesList>;
      this.dataSource = this.datos;
    });
  }
  public applyFilter(): void {
    // this.dataSource.includes(this.nameFilter.toLowerCase());
    this.dataSource = this.datos.filter(
      (i) =>
        i.CANTIDAD.toString().includes(this.nameFilter) ||
        i.FECHA.toLowerCase().includes(this.nameFilter) ||
        i.ID_CLIENTE.toString().includes(this.nameFilter) ||
        i.ID_PRODUCTO.toString().includes(this.nameFilter) ||
        i.ID_VENTA.toString().includes(this.nameFilter)
    );
  }
  saveSale() {
    if (this.userForm.valid) {
      const sale = this.userForm.value;
      console.log(sale);

      this.ventasService.add(sale).subscribe((response) => {
        console.log(response);
        // this.router.navigate(['./admin/products']);
        this.userForm.reset();
        this.getData();
      });
    }
  }
  deleteSale(id: number) {
    let data = {
      salesid: id,
    };
    this.ventasService.delete(data).subscribe((rpta) => {
     
     this.getData();
      // console.log(rpta);
      // const index = this.dataSource.findIndex((venta) => {
      //   venta.ID_CLIENTE == id;
      // });
      // this.dataSource.splice(index, 1);
      // this.dataSource = [...this.dataSource];
    });
  }

  exportexcel() {
    new ExportExcelPipe().transform('ventas.xlsx', 'excel-ventas');
  }
}
