import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Chart } from 'chart.js';
import { PredictionList } from 'src/app/src/shared/interfaces/predictions';
import { RandomColorPipe } from 'src/app/src/shared/pipes/randomColor/random-color.pipe';
import { PredictionsService } from 'src/app/src/shared/services/predictions/predictions.service';

@Component({
  selector: 'app-prediccion',
  templateUrl: './prediccion.component.html',
  styleUrls: ['./prediccion.component.scss'],
})
export class PrediccionComponent implements OnInit {
  // Filter
  public nameFilter!: string;

  // Table
  public datos: Array<PredictionList> = [];
  public displayedColumns: string[] = [
    'ID_RESULTADO_MODELO',
    'NOMBRE',
    'PRECISION_MODELO',
    'PREDICCION',
  ];
  public dataSource = this.datos;
  DATA_COUNT = 7;
  NUMBER_CFG = { count: this.DATA_COUNT, rmin: 5, rmax: 15, min: 0, max: 100 };

  // ChartJS
  public canvas: any;
  public ctx: any;
  public labels: Array<string> = [
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
    chart1: [2000, 10000, 12000, 300, 6000, 0, 0, 100, 0, 0, 0, 0],
    chart2: [200, 1000, 1200, 1400, 600, 0, 0, 0, 0, 0, 0, 0],
  };
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private authPrediction: PredictionsService) {}

  ngOnInit(): void {
    this.authPrediction.list().subscribe(
      (datos) => {
        this.datos = JSON.parse(JSON.stringify(datos))
          .response as Array<PredictionList>;
        this.dataSource = this.datos;
        console.log(this.datos);
      },
      (error) => {
        console.log(error);
      }
    );
    this.createLineChart();
    this.createLineChart2();
  }

  public createLineChart(): void {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

    let chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Lusho',
            data: this.dataCases.chart1,
            backgroundColor: new RandomColorPipe().transform(),
            fill: false,
            borderWidth: 2,
          },
          {
            label: 'Gat o',
            data: this.dataCases.chart2,
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
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Lusho',
            data: this.dataCases.chart1,
            backgroundColor: new RandomColorPipe().transform(),
            fill: false,
            borderWidth: 2,
          },
          {
            label: 'Gato',
            data: this.dataCases.chart2,
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

  applyFilter(): void {
    // this.dataSource.includes(this.nameFilter.toLowerCase());
    this.dataSource = this.datos.filter(
      (i) =>
        i.ID_RESULTADO_MODELO.toString().includes(this.nameFilter) ||
        i.NOMBRE.toLowerCase().includes(this.nameFilter) ||
        i.PRECISION_MODELO.toString().includes(this.nameFilter) ||
        i.PREDICCION.toString().includes(this.nameFilter)
    );
  }
}
