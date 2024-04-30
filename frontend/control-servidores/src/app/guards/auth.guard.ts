import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService)
  const router = inject(Router);
  
  console.log("Pasó por canactivate");
  return loginService.validarToken().pipe(
    tap( estaAutenticado => {
      if(!estaAutenticado) {
        router.navigateByUrl('/login')
      }
    })
  )
  
};
