import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-prediccion',
  templateUrl: './prediccion.component.html',
  styleUrls: ['./prediccion.component.scss'],
})
export class PrediccionComponent implements OnInit {
  // Table
  datos: any = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.datos;
  DATA_COUNT = 7;
  NUMBER_CFG = { count: this.DATA_COUNT, rmin: 5, rmax: 15, min: 0, max: 100 };

  // ChartJS
  public canvas: any;
  public ctx: any;
  public labels: any = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  public dataCases: any = {
    chart1: [2000, 10000, 12000, 14000, 6000, 0, 0, 0, 0, 0, 0, 0],
    chart2: [200, 1000, 1200, 1400, 600, 0, 0, 0, 0, 0, 0, 0],
  };

  constructor() {}

  ngOnInit(): void {
    this.createLineChart();
  }

  public createLineChart(): void {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

    let chart = new Chart(this.ctx, {
      type: 'line',
      // type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Lusho',
            data: this.dataCases.chart1,
            backgroundColor: '#ffbb33',
            borderColor: '#ffbb33',
            fill: false,
            borderWidth: 2,
          },
          {
            label: 'Gato',
            data: this.dataCases.chart2,
            backgroundColor: '#ff4444',
            borderColor: '#ff4444',
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
}
