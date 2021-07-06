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
import { PredictionsService } from 'src/app/src/shared/services/predictions/predictions.service';
import { PredictionList } from 'src/app/src/shared/interfaces/predictions';
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
  public ordenes: any = [];
  public modelId: any = [];
  public datos1: any = [];
  public dataSource = this.datos;

  public paginator!: MatPaginator;
  public sort!: MatSort;
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private authPrediction: PredictionsService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getProductos();
  }

  getData() {
    this.purchasesService.listPurchases().subscribe((datos) => {
      console.log('get data ', datos);

      this.datos = JSON.parse(JSON.stringify(datos))
        .response as Array<ResponsePurchase>;
      this.dataSource = this.datos;
    });
    this.authPrediction.list().subscribe(
      (datos) => {
        this.datos1 = JSON.parse(JSON.stringify(datos))
          .response as Array<PredictionList>;
        console.log(this.datos1);
      },
      (error) => {}
    );
  }
  getProductos() {
    this.productsService.listProducts().subscribe((datos) => {
      this.ordenes = JSON.parse(JSON.stringify(datos)).response;
      console.log('la orden es ', this.ordenes);
    });
  }
  savePurchase() {
    if (this.userForm.valid) {
      const purchase = this.userForm.value;
      this.purchasesService.addPurchases(purchase).subscribe((response) => {
        this.getData();
        this.userForm.reset();
      });
    }
  }
  public applyFilter(): void {
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

    this.purchasesService.deletePurchases(data).subscribe((rpta) => {
      this.getData();
    });
  }

  exportexcel() {
    new ExportExcelPipe().transform('orden-compra.xlsx', 'excel-ordencompra');
  }
}
