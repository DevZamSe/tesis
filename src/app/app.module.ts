import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './src/auth/auth.module';
import { FeaturedModulesModule } from './src/featured-modules/featured-modules.module';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { ExportExcelPipe } from './src/shared/pipes/exportExcel/export-excel.pipe';



@NgModule({
  declarations: [AppComponent, ExportExcelPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FeaturedModulesModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    MatDialogModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
