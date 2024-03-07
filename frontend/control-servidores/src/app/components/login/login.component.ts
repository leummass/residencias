import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  numemp: string;
  cargando: boolean = false;
  constructor(private formBuilder: FormBuilder, private loginService:LoginService, private router:Router){
    this.form = new FormGroup({
      empleado: new FormControl ('', [Validators.required,Validators.minLength(8),Validators.pattern('^[0-9]+$')]),
      password: new FormControl ('', [Validators.required,Validators.minLength(8)])
    })
  }
  login(){
    this.numemp=this.form.value.empleado;
    if(this.loginService.login(this.numemp)){
      this.falsoCargando();
      
    }else{
      this.form.reset();
    }
    
  }
  falsoCargando(){
    this.cargando=true;
    setTimeout(()=>{
      //Agregar routing
      this.router.navigate(['inicio']);
    },1500);
  }
  MensajeError(){
    let error:string = "";
    if(this.form.get('empleado')?.hasError('minlength')){
      error = "La longitud mínima es 8"
    }
    
    if(this.form.get('empleado')?.hasError('pattern')){
      error = "Solo se aceptan números"
    }
    
    if(this.form.get('empleado')?.hasError('required')){
      error = "Campo requerido"
    }

    return error;
  }
}
