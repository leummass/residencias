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
import { ExpandServicioComponent } from './servicios/expand-servicio/expand-servicio.component';
import { AgregarServicioComponent } from './servicios/agregar-servicio/agregar-servicio.component';
import { ExpandServidorComponent } from './servidores/expand-servidor/expand-servidor.component';
import { AgregarServidorComponent } from './servidores/agregar-servidor/agregar-servidor.component';
import { AgregarDetalleServidorComponent } from './servidores/agregar-detalle-servidor/agregar-detalle-servidor.component';
import { ExpandDetalleServidorComponent } from './servidores/expand-detalle-servidor/expand-detalle-servidor.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ExpandUsuarioComponent } from './usuarios/expand-usuario/expand-usuario.component';
import { AgregarUsuarioComponent } from './usuarios/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';


@NgModule({
  declarations: [
    InicioComponent,
    NavbarComponent,
    ServiciosComponent,
    ServidoresComponent,
    ExpandServicioComponent,
    AgregarServicioComponent,
    ExpandServidorComponent,
    AgregarServidorComponent,
    AgregarDetalleServidorComponent,
    ExpandDetalleServidorComponent,
    UsuariosComponent,
    ExpandUsuarioComponent,
    AgregarUsuarioComponent,
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
