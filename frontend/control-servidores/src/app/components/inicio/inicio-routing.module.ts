import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ServidoresComponent } from './servidores/servidores.component';

const routes: Routes = [
  {path: '', component: InicioComponent, children: [
      {path: 'servicios', component: ServiciosComponent},
      {path: 'servidores', component: ServidoresComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
