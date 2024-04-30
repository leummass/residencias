import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  private api_url = 'http://localhost:3001/api/servicios/';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  getServicio(Id: number) {}

  getServicios() {
    return this.http.get(`${this.api_url}`, {
      headers: {
        'token': this.loginService.token,
      },
    }).pipe(
      tap((resp: any) => {
        if (!resp.ok) {
          Swal.fire('Error', resp.msg, 'error');
        }
      })
    );
  }

  actualizarServicio(servicio: any) {
    return this.http.put(`${this.api_url}`, servicio, {
      headers: {
        'token': this.loginService.token,
      },
    });
  }

  guardarServicio(servicio: any) {
    return this.http.post(`${this.api_url}`, servicio, {
      headers: {
        'token': this.loginService.token,
      },
    })
  }

  eliminarServicio(Id: number) {}
}
