import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturedModulesRoutingModule } from './featured-modules-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../shared/material/material.module';
import { ClientesComponent } from './components/clientes/clientes.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { PrediccionComponent } from './components/prediccion/prediccion.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { OrdencompraComponent } from './components/ordencompra/ordencompra.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RandomColorPipe } from '../shared/pipes/randomColor/random-color.pipe';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    ClientesComponent,
    VentasComponent,
    PrediccionComponent,
    ReportesComponent,
    InventarioComponent,
    OrdencompraComponent,
    UsuariosComponent,
    RandomColorPipe,
    
  ],
  imports: [CommonModule, FeaturedModulesRoutingModule, MaterialModule,FormsModule, ReactiveFormsModule],
})
export class FeaturedModulesModule {}
