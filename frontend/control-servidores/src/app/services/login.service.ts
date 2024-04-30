import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, of, tap } from 'rxjs';

@Injectable()
export class LoginService {
  private api_url = 'http://localhost:3001/api';
  public usuario: Usuario;

  constructor(private router: Router, private http: HttpClient) {}
  get token() {
    return localStorage.getItem('token') || '';
  }
  get usuarioUid() {
    return this.usuario.NoColaborador || '';
  }

  login(formData: any) {
    const formLogin: LoginForm = formData;
    return this.http.post(`${this.api_url}/login`, formLogin).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  validarToken(){
    return this.http
      .get(`${this.api_url}/login/renew`, {
        headers: {
          'token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          //Se guardan los datos del usuario que acaba de logear
          const { NoColaborador, Tipo } = resp.usuario;
          this.usuario = new Usuario(NoColaborador, Tipo);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error) => of(false))
      )
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
