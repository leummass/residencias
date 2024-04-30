import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const adminGuardGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  if(loginService.usuario.Tipo === 'Arquitecto' || loginService.usuario.Tipo === 'Lider' || loginService.usuario.Tipo === 'Gerente'){
    return true;
  }else {
    return false;
  }
  
};
