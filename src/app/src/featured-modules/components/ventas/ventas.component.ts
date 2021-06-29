import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/src/shared/services/ventas/ventas.service';
import { ProductsService } from 'src/app/src/shared/services/products/products.service';
import { ClientesService } from 'src/app/src/shared/services/clientes/clientes.service';
import { SalesList } from './../../../shared/interfaces/ventas';
import { ListProduct } from './../../../shared/interfaces/products';
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
  productos: any = [];
  clientes: any = [];
  public paginator!: MatPaginator;
  public sort!: MatSort;
  constructor(
    private ventasService: VentasService,
    private productsService: ProductsService,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getProducts();
    this.getClientes();
  }
  getData() {
    this.ventasService.list().subscribe((datos) => {
      console.log(datos);
      
      this.datos = JSON.parse(JSON.stringify(datos))
        .response as Array<SalesList>;
      this.dataSource = this.datos;
    });
  }
  getProducts() {
    this.productsService.listProducts().subscribe((datos) => {
      this.productos = JSON.parse(JSON.stringify(datos)).response;
      console.log(this.productos);
    });
  }
  getClientes() {
    this.clientesService.listClients().subscribe((datos) => {
      this.clientes = JSON.parse(JSON.stringify(datos)).response;
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
