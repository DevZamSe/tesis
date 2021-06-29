import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { PurchasesService } from 'src/app/src/shared/services/purchases/purchases.service';
import { ProductsService } from 'src/app/src/shared/services/products/products.service';
import { ResponsePurchase } from './../../../shared/interfaces/purchases';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExportExcelPipe } from 'src/app/src/shared/pipes/exportExcel/export-excel.pipe';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-ordencompra',
  templateUrl: './ordencompra.component.html',
  styleUrls: ['./ordencompra.component.scss'],
})
export class OrdencompraComponent implements OnInit {
  hide = true;
  public nameFilter!: string;
  userForm = new FormGroup({
    modeloid: new FormControl(''),
    productid: new FormControl(''),
    proovedor: new FormControl(''),
    mensaje: new FormControl(''),
  });
  public displayedColumns: string[] = [
    'PROVEEDOR',
    'MENSAJE',
    'ID_ORDEN_COMPRA',
    'ID_PRODUCTO',
    'ID_RESULTADO_MODELO',
    'FECHA',
    'OPCIONES',
  ];
  public datos: Array<ResponsePurchase> = [];
  ordenes: any = [];
  public dataSource = this.datos;

  public paginator!: MatPaginator;
  public sort!: MatSort;
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getProductos();
  }

  getData() {
    this.purchasesService.listPurchases().subscribe((datos) => {
      console.log(datos);
      
      this.datos = JSON.parse(JSON.stringify(datos))
        .response as Array<ResponsePurchase>;
      this.dataSource = this.datos;
    });
  }
<<<<<<< HEAD
  getProductos(){
    this.productsService.listProducts().subscribe((datos)=>{
     
      
      this.ordenes=JSON.parse(JSON.stringify(datos)).response;

    })
=======
  getProductos() {
    this.productsService.listProducts().subscribe((datos) => {
      this.ordenes = JSON.parse(JSON.stringify(datos)).response;
    });
>>>>>>> fe85e109fc9539c188141b14b6dcdcd5b8aed52d
  }
  savePurchase() {
    if (this.userForm.valid) {
      const purchase = this.userForm.value;
      //console.logpurchase);

      this.purchasesService.addPurchases(purchase).subscribe((response) => {
        //console.logresponse);
        // this.router.navigate(['./admin/products']);
        this.getData();
        this.userForm.reset();
      });
    }
  }
  public applyFilter(): void {
    // this.dataSource.includes(this.nameFilter.toLowerCase());
    this.dataSource = this.datos.filter(
      (i) =>
        i.PROVEEDOR.toString().includes(this.nameFilter) ||
        i.MENSAJE.toLowerCase().includes(this.nameFilter) ||
        i.ID_ORDEN_COMPRA.toString().includes(this.nameFilter) ||
        i.ID_PRODUCTO.toString().includes(this.nameFilter) ||
        i.FECHA.toString().includes(this.nameFilter)
    );
  }
  deleteProduct(id: number) {
    let data = {
      purchaseid: id,
    };
    //console.logdata);

    this.purchasesService.deletePurchases(data).subscribe((rpta) => {
      this.getData();
      // //console.logrpta);
      // const index = this.dataSource.findIndex((orden) => {
      //   orden.ID_PRODUCTO == id;
      // });
      // this.dataSource.splice(index, 1);
      // this.dataSource = [...this.dataSource];
    });
  }

  exportexcel() {
    new ExportExcelPipe().transform('orden-compra.xlsx', 'excel-ordencompra');
  }
}
