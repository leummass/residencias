import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../../services/usuarios.service';
import { LoginService } from '../../../../services/login.service';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent {

  public editarUsuarioForm: FormGroup;

  public usuario: Usuario;

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService, private loginService: LoginService) {
    this.usuario = loginService.usuario;
  }

  ngOnInit(): void {
    this.editarUsuarioForm = this.fb.group({
      NoColaborador: [this.usuario.NoColaborador, [Validators.required,Validators.minLength(8),Validators.pattern('^[0-9]+$')]],
      Contrasena: ['', [Validators.required, Validators.minLength(8)]],
      Tipo: [this.usuario.Tipo, Validators.required]
    })
  }

  editarUsuario(){
    this.usuariosService.actualizarUsuario(this.editarUsuarioForm.value).subscribe({
      
    })
  }
  MensajeError(nombre_campo: string) {
    const campo = this.editarUsuarioForm.get(nombre_campo);
    if (campo?.hasError('required')) {
      return 'Campo requerido';
    }
    if (campo?.hasError('pattern')) {
      return 'Formato incorrecto';
    }
    return '';
  }
}
