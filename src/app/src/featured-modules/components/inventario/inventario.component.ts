import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ResponseProduct } from './../../../shared/interfaces/products';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductsService } from 'src/app/src/shared/services/products/products.service';
import { ExportExcelPipe } from 'src/app/src/shared/pipes/exportExcel/export-excel.pipe';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
})
export class InventarioComponent implements OnInit {
  hide = true;
  public nameFilter!: string;
  userForm = new FormGroup({
    nombre: new FormControl(''),
    precio: new FormControl(''),
    stock: new FormControl(''),
  });
  public displayedColumns: string[] = [
    'ID_PRODUCTO',
    'NOMBRE_PRODUCTO',
    'PRECIO',
    'STOCK',
    'OPCIONES',
  ];
  public datos: Array<ResponseProduct> = [];
  public dataSource = this.datos;

  public paginator!: MatPaginator;
  public sort!: MatSort;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.productsService.listProducts().subscribe((datos) => {
      this.datos = JSON.parse(JSON.stringify(datos))
        .response as Array<ResponseProduct>;
      this.dataSource = this.datos;
    });
  }
  saveProduct(event: Event) {
    event.preventDefault();
    if (this.userForm.valid) {
      const product = this.userForm.value;
      console.log(product);

      this.productsService.addProduct(product).subscribe((response) => {
        console.log(response);
        // this.router.navigate(['./admin/products']);
        this.userForm.reset();
        this.getData();
      });
    }
  }
  public applyFilter(): void {
    // this.dataSource.includes(this.nameFilter.toLowerCase());
    this.dataSource = this.datos.filter((i) =>
      i.NOMBRE_PRODUCTO.toString().includes(this.nameFilter)
    );
  }
  deleteProduct(id: number) {
    let data = {
      productid: id,
    };
    this.productsService.deleteProduct(data).subscribe((rpta) => {
      console.log(rpta);
      const index = this.dataSource.findIndex((product) => {
        product.ID_PRODUCTO == id;
      });
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    });
  }
  exportexcel() {
    new ExportExcelPipe().transform('producto.xlsx', 'excel-inventario');
  }
}
