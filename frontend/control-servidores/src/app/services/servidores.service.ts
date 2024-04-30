import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogo_Servidor } from "../models/catalogo_servidor.model";
import { Catalogo_DetalleServidor } from "../models/catalogo_detalleservidor.model";
import { LoginService } from './login.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServidoresService {

  constructor(private http: HttpClient, private loginService: LoginService) { }
  private api_url_servidores = 'http://localhost:3001/api/servidores/';
  private api_url_detalles = 'http://localhost:3001/api/detalle_servidores/';

  //servidores
  getServidorById(Id: number){

  }

  getServidores(){
    return this.http.get(`${this.api_url_servidores}`, {
      headers: {
        'token': this.loginService.token,
      },
    }).pipe(
      tap((resp: any) => {
        if (!resp.ok) {
          Swal.fire('Error', resp.msg, 'error');
        }
        console.log(resp);
      })
    );
  }


  guardarServidor(servidor:any){
    return this.http.post(`${this.api_url_servidores}`, servidor, {
      headers: {
        'token': this.loginService.token,
      },
    });
  }

  actualizarServidor(servidor: any){
    return this.http.put(`${this.api_url_servidores}`, servidor, {
      headers: {
        'token': this.loginService.token,
      },
    });
  }

  eliminarServidor(Id: number){

  }


  //detalles servidores
  getDetalles(Id:number){
    return this.http.get(`${this.api_url_detalles}${Id}`, {
      headers: {
        'token': this.loginService.token,
      },
    })
  }
  guardaDetalle(detalle:any){
    return this.http.post(`${this.api_url_detalles}`, detalle, {
      headers: {
        'token': this.loginService.token,
      },
    })
  }
  eliminarDetalle(Id:number){

  }
  actualizaDetalle(detalle: any){
    return this.http.put(`${this.api_url_detalles}`, detalle, {
      headers: {
        'token': this.loginService.token,
      },
    });
  }
}
