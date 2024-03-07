import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "../models/usuario.model";

@Injectable()
export class LoginService{
    usuario:Usuario;
    constructor(private router: Router){
        
    }
    login(numemp:string){
        this.usuario = new Usuario(numemp,"adm");
        return true;
    }
}