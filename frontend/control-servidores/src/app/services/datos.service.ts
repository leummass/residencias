import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from "./login.service";
import { Catalogo_Servidor } from "../models/catalogo_servidor.model";
import { Observable } from "rxjs";
import { Catalogo_Servicio } from "../models/catalogo_servicio.model";
import { Catalogo_DetalleServidor } from "../models/catalogo_detalleservidor.model";


@Injectable()
export class DatosService{
    constructor(private httpClient:HttpClient){
        
    }
    private apiCatalogo_Servidor = 'http://localhost:3001/catalogo_servidor';
    private apiCatalogo_Servicio = 'http://localhost:3001/catalogo_servicio'
    private apiCatalogo_DetalleServidor = 'http://localhost:3001/catalogo_detalleservidor';
    
    //Peticiones
    
    //CONSULTAS
    //Obtiene todos los servidores para el catálogo de servidores
    getServidores(params:any):Observable<Catalogo_Servidor[]>{
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        return this.httpClient.post<Catalogo_Servidor[]>(this.apiCatalogo_Servidor,params,{headers});
    }
    //Obtiene todos los servicios para el catálogo de servicios
    getServicios():Observable<Catalogo_Servicio[]>{
        return this.httpClient.get<Catalogo_Servicio[]>(this.apiCatalogo_Servicio)
    }
    
    //Obtiene todos los detalles de servidor
    getDetalleServidor():Observable<Catalogo_DetalleServidor[]>{
        return this.httpClient.get<Catalogo_DetalleServidor[]>(this.apiCatalogo_DetalleServidor)
    }

    //INSERCIONES

    //Añade un servidor
    addServidor(params:any):Observable<number>{
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        console.log(params)
        return this.httpClient.post<number>(this.apiCatalogo_Servidor+"/anadir",params,{headers})
    }
    //Añade detalles de servidor uno por uno
    addDetalleServidor(params:any):Observable<string>{
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        console.log(params)
        return this.httpClient.post<string>(this.apiCatalogo_DetalleServidor+"/anadir",params,{headers})
    }
}