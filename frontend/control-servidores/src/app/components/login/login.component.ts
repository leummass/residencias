import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  cargando: boolean = false;
  constructor(private formBuilder: FormBuilder, private loginService:LoginService, private router:Router){
    this.form = new FormGroup({
      NoColaborador: new FormControl ('', [Validators.required,Validators.minLength(8),Validators.pattern('^[0-9]+$')]),
      Contrasena: new FormControl ('', [Validators.required,Validators.minLength(8)])
    })
  }
  login(){
    this.loginService.login(this.form.value).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/inicio')
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
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
    if(this.form.get('NoColaborador')?.hasError('minlength')){
      error = "La longitud mínima es 8"
    }
    
    if(this.form.get('NoColaborador')?.hasError('pattern')){
      error = "Solo se aceptan números"
    }
    
    if(this.form.get('NoColaborador')?.hasError('required')){
      error = "Campo requerido"
    }

    return error;
  }
}
