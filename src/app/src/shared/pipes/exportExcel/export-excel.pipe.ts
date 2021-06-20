import { Pipe, PipeTransform } from '@angular/core';
import * as XLSX from 'xlsx';

@Pipe({
  name: 'exportExcel',
})
export class ExportExcelPipe implements PipeTransform {
  transform(name: any, html: any) {
    let element = document.getElementById(html);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, name);
  }
}
