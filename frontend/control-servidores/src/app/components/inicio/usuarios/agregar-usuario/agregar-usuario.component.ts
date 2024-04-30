import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../../services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrl: './agregar-usuario.component.css',
})
export class AgregarUsuarioComponent {
  tipo_usuario: any[] = [
    { value: 'Desarrollador', viewValue: 'Desarrollador' },
    { value: 'Tester', viewValue: 'Tester' },
    { value: 'Arquitecto', viewValue: 'Arquitecto' },
    { value: 'Lider', viewValue: 'Lider' },
    { value: 'Gerente', viewValue: 'Gerente' },
  ];

  public guardarUsuarioForm: FormGroup;

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.guardarUsuarioForm = this.fb.group({
      NoColaborador: ['', [Validators.required,Validators.minLength(8),Validators.pattern('^[0-9]+$')]],
      Contrasena: ['', [Validators.required, Validators.minLength(8)]],
      Tipo: ['', Validators.required]
    })
  }

  guardarUsuario(){
    this.usuariosService.guardarUsuario(this.guardarUsuarioForm.value).subscribe({
      next: (resp: any) => {
        Swal.fire('Usuario agregado', resp.msg, 'success');
      },
      error: (err) => {
        Swal.fire('Ocurrió un error', err.error.msg, 'error');
      },
    })
  }

  //handler para mostrar mensajes de error
  MensajeError(nombre_campo: string) {
    const campo = this.guardarUsuarioForm.get(nombre_campo);
    if (campo?.hasError('required')) {
      return 'Campo requerido';
    }
    if (campo?.hasError('pattern')) {
      return 'Formato incorrecto';
    }
    return '';
  }
  limpiarForm(){
    Object.keys(this.guardarUsuarioForm.controls).forEach((key) => {
      this.guardarUsuarioForm.get(key)?.setErrors(null);
    });
    this.guardarUsuarioForm.reset();
  }
}
