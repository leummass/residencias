import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ServidoresComponent } from './servidores/servidores.component';
import { authGuard } from '../../guards/auth.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { adminGuardGuard } from '../../guards/admin-guard.guard';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';

const routes: Routes = [
  {path: '', component: InicioComponent, canActivate: [authGuard], children: [
      {path: 'servicios', component: ServiciosComponent},
      {path: 'servidores', component: ServidoresComponent},
      {path: 'editar-usuario', component: EditarUsuarioComponent},
      {path: 'usuarios', canActivate:[adminGuardGuard], component: UsuariosComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
