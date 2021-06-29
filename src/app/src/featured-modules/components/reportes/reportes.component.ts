import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as Chart from 'chart.js';
import { ChartData } from 'src/app/src/shared/data/chart';
import { RandomColorPipe } from 'src/app/src/shared/pipes/randomColor/random-color.pipe';
import { ReportsService } from './../../../shared/services/reports/reports.service';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent implements OnInit {
  public displayedColumns: string[] = [
    'compras',
    'dinero_ventas',
    'mes',
    'ventas',
  ];
  datita: any;
  public datos: any = [];
  public dataSource = this.datos;
  public labels: Array<string> = ChartData;
  public canvas: any;
  public ctx: any;
  compras: number = 0;
  ventas: number = 0;

  public paginator!: MatPaginator;
  public sort!: MatSort;

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.reportsService.listReport().subscribe((datos) => {
      this.datita = JSON.parse(JSON.stringify(datos));
      console.log(this.datita);
      this.compras = this.datita.compras_anual;
      this.ventas = this.datita.ventas_anual;
      this.dataSource = this.datita.mensual;
      console.log('tmr', this.dataSource);
      this.createLineChart();
      this.createLineChart2();
    });
  }

  public createLineChart(): void {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

    let chart = new Chart(this.ctx, {
      type: 'horizontalBar',
      
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Reporte Mensual',
            data: this.forData(),
            backgroundColor: new RandomColorPipe().transform(),
            fill: false,
            borderWidth: 2,
          },
        ],
        
      },
      options: {
        
        title: {
          display: false,
          text: 'First chart',
        },
        
        tooltips: {
          mode: 'index',
          intersect: true,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
      },
    });
  }

  public createLineChart2(): void {
    this.canvas = document.getElementById('myChart2');
    this.ctx = this.canvas.getContext('2d');

    let chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Reporte Ventas',
            data: this.forData2(),
            backgroundColor: new RandomColorPipe().transform(),
            fill: false,
            borderWidth: 2,
          },
        ],
      },
      options: {
        title: {
          display: false,
          text: 'First chart',
        },
        tooltips: {
          mode: 'index',
          intersect: true,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
      },
    });
  }

  public forData(): Array<number> {
    var data: Array<number> = [];
    for (let index = 0; index < this.dataSource.length; index++) {
      data.push(this.dataSource[index].dinero_ventas);
    }
    return data;
  }

  public forData2(): Array<number> {
    var data: Array<number> = [];
    for (let index = 0; index < this.dataSource.length; index++) {
      data.push(this.dataSource[index].ventas);
    }
    return data;
  }
}
