import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {ReportsService} from './../../../shared/services/reports/reports.service'
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  public displayedColumns: string[] = [
    'compras',
    'dinero_ventas',
    'mes',
    'ventas',
  ];
  datita:any;
  public datos:any  = [];
  public dataSource = this.datos;
  compras:number=0;
  ventas:number=0;


  public paginator!: MatPaginator;
  public sort!: MatSort;

  constructor(private reportsService:ReportsService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.reportsService.listReport().subscribe((datos)=>{
      
      this.datita=JSON.parse(JSON.stringify(datos))
      console.log(this.datita);
    this.compras=this.datita.compras_anual;
    this.ventas=this.datita.ventas_anual;
    this.dataSource = this.datita.mensual;
    })
  }
  
}
