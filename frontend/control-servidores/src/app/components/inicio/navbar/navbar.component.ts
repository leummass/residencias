import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  public usuario: Usuario;

  constructor(private loginService: LoginService){
    this.usuario = loginService.usuario;
    
  }

  logout(){
    this.loginService.logout();
  }

  visible(){
    if(this.usuario.Tipo === 'Arquitecto' || this.usuario.Tipo === 'Lider' || this.usuario.Tipo === 'Gerente'){
      return true;
    }else {
      return false;
    }
  }
}
