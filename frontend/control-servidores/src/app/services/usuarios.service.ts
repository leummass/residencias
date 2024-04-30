import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private api_url = 'http://localhost:3001/api/usuarios/'

  constructor(private http:HttpClient, private loginService: LoginService) { }

  getUsuarios(){
    return this.http.get(`${this.api_url}`,{
      headers: {
        'token': this.loginService.token,
      }
    }).pipe(
      tap((resp: any) => {
        if (!resp.ok) {
          Swal.fire('Error', resp.msg, 'error');
        }
      })
    )
  }

  actualizarUsuario(usuario: any){
    return this.http.put(`${this.api_url}`, usuario, {
      headers: {
        'token': this.loginService.token,
      },
    });
  }

  guardarUsuario(usuario: any) {
    return this.http.post(`${this.api_url}`, usuario, {
      headers: {
        'token': this.loginService.token,
      },
    });
  }
}
