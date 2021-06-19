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
import { ModalUsuarioEditComponent } from './components/modals/modal-usuario-edit/modal-usuario-edit.component';
import { RandomColorPipe } from '../shared/pipes/randomColor/random-color.pipe';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ModalClientEditComponent } from './components/modals/modal-client-edit/modal-client-edit.component';

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
    ModalUsuarioEditComponent,
    ModalClientEditComponent
    
  ],
  imports: [CommonModule, FeaturedModulesRoutingModule, MaterialModule,FormsModule, ReactiveFormsModule],
})
export class FeaturedModulesModule {}
