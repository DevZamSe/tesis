import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Chart } from 'chart.js';
import { ChartData, TablePrediction } from 'src/app/src/shared/data/chart';
import { PredictionList } from 'src/app/src/shared/interfaces/predictions';
import { ExportExcelPipe } from 'src/app/src/shared/pipes/exportExcel/export-excel.pipe';
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
  public displayedColumns: Array<string> = TablePrediction;
  public dataSource = this.datos;

  // ChartJS
  public canvas: any;
  public ctx: any;
  public labels: Array<string> = ChartData;
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
        this.createLineChart();
      },
      (error) => {
        this.createLineChart();
      }
    );
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
            label: 'Presición mensual',
            data: this.getDataPresicion(),
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

  private getDataPresicion(): Array<number> {
    var data: Array<number> = [];

    for (let index = 0; index < this.datos.length; index++) {
      data.push(this.datos[index].PRECISION_MODELO);
    }

    return data;
  }

  public applyFilter(): void {
    this.dataSource = this.datos.filter(
      (i) =>
        i.ID_RESULTADO_MODELO.toString().includes(this.nameFilter) ||
        i.NOMBRE.toLowerCase().includes(this.nameFilter) ||
        i.PRECISION_MODELO.toString().includes(this.nameFilter) ||
        i.PREDICCION.toString().includes(this.nameFilter)
    );
  }

  exportexcel() {
    new ExportExcelPipe().transform('prediccion.xlsx', 'excel-prediccion');
  }
}
