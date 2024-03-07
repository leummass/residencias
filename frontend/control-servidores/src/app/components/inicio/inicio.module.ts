import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//routing
import { InicioRoutingModule } from './inicio-routing.module';
//components
import { NavbarComponent } from './navbar/navbar.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ServidoresComponent } from './servidores/servidores.component';
import { SharedModule } from '../../shared/shared.module';
import { InicioComponent } from './inicio.component';


@NgModule({
  declarations: [
    InicioComponent,
    NavbarComponent,
    ServiciosComponent,
    ServidoresComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
