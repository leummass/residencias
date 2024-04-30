import { Component, Input } from '@angular/core';
import { Usuario } from '../../../../models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../../services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expand-usuario',
  templateUrl: './expand-usuario.component.html',
  styleUrl: './expand-usuario.component.css',
})
export class ExpandUsuarioComponent {
  @Input() usuario: Usuario;

  public actualizarUsuarioForm: FormGroup;

  tipo_usuario: any[] = [
    { value: 'Desarrollador', viewValue: 'Desarrollador' },
    { value: 'Tester', viewValue: 'Tester' },
    { value: 'Arquitecto', viewValue: 'Arquitecto' },
    { value: 'Lider', viewValue: 'Lider' },
    { value: 'Gerente', viewValue: 'Gerente' },
  ];

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.actualizarUsuarioForm = this.fb.group({
      NoColaborador: [this.usuario.NoColaborador, [Validators.required,Validators.minLength(8),Validators.pattern('^[0-9]+$')]],
      Contrasena: ['', [Validators.minLength(8)]],
      Tipo: [this.usuario.Tipo, Validators.required]
    })
  }

  actualizarUsuario(){
    this.usuariosService.actualizarUsuario(this.actualizarUsuarioForm.value).subscribe({
      next: (resp:any) => {
        const {Tipo} = this.actualizarUsuarioForm.value;
        this.usuario.Tipo = Tipo;
        Swal.fire('Usuario actualizado',resp.msg, 'success');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    })
  }

   //handler para mostrar mensajes de error
   MensajeError(nombre_campo: string) {
    const campo = this.actualizarUsuarioForm.get(nombre_campo);
    if (campo?.hasError('required')) {
      return 'Campo requerido';
    }
    if (campo?.hasError('pattern')) {
      return 'Formato incorrecto';
    }
    return '';
  }
}
