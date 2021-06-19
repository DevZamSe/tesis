import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { PurchasesService } from 'src/app/src/shared/services/purchases/purchases.service';
import {ResponsePurchase} from './../../../shared/interfaces/purchases';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-ordencompra',
  templateUrl: './ordencompra.component.html',
  styleUrls: ['./ordencompra.component.scss']
})
export class OrdencompraComponent implements OnInit {
  
  hide = true;
  public nameFilter!: string;
  userForm= new FormGroup({
    modeloid:new FormControl(''),
    productid:new FormControl(''),
    proovedor:new FormControl(''),
    mensaje:new FormControl('')

  });
  public displayedColumns: string[] = [
    'PROVEEDOR',
    'MENSAJE',
    'ID_ORDEN_COMPRA',
    'ID_PRODUCTO',
    'ID_RESULTADO_MODELO',
    'FECHA',
    'OPCIONES'
  ];
  public datos: Array<ResponsePurchase> = [];
  public dataSource =this.datos;
 

  public paginator!: MatPaginator;
  public sort!: MatSort;
  constructor(private purchasesService:PurchasesService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.purchasesService.listPurchases().subscribe((datos)=>{
      this.datos = JSON.parse(JSON.stringify(datos))
      .response as Array<ResponsePurchase>;
    this.dataSource=this.datos;
    })
  }
  savePurchase(){
    if (this.userForm.valid) {
      const purchase = this.userForm.value;
      console.log(purchase);
      
      this.purchasesService.addPurchases(purchase)
      .subscribe((response) => {
        console.log(response);
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
  deleteProduct(id:number)
  {
    let data={
      productid:id,
    }
    console.log(data);
    
    this.purchasesService.deletePurchases(data).subscribe(rpta=>{
      console.log(rpta);
      const index = this.dataSource.findIndex((orden) =>{orden.ID_PRODUCTO == id;
   
      } );
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    } );
  }
}
