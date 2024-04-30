import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServidoresService } from '../../../../services/servidores.service';
import Swal from 'sweetalert2';
import { Catalogo_DetalleServidor } from '../../../../models/catalogo_detalleservidor.model';

@Component({
  selector: 'app-agregar-servidor',
  templateUrl: './agregar-servidor.component.html',
  styleUrl: './agregar-servidor.component.css',
})
export class AgregarServidorComponent {

  tipo_serv: any[] = [
    { value: 'Tester', viewValue: 'Tester' },
    { value: 'Desarrollo', viewValue: 'Desarrollo' },
    { value: 'Produccion', viewValue: 'Produccion' },
  ];

  Catalogo_detalles: Catalogo_DetalleServidor[];
  
  public guardarServidorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servidoresService: ServidoresService
  ) {}
  ngOnInit(): void {
    this.guardarServidorForm = this.fb.group({
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Tipo: ['', Validators.required],
    });
  }

  guardarServidor() {
    if (this.guardarServidorForm.invalid) {
      return;
    }

    this.servidoresService
      .guardarServidor(this.guardarServidorForm.value)
      .subscribe({
        next: (resp: any) => {
          Swal.fire('Servidor agregado', resp.msg, 'success');
        },
        error: (err) => {
          Swal.fire('Ocurrió un error', err.error.msg, 'error');
        },
      });
  }

  MensajeError(nombre_campo: string) {
    const campo = this.guardarServidorForm.get(nombre_campo);
    if (campo?.hasError('required')) {
      return 'Campo requerido';
    }
    if (campo?.hasError('pattern')) {
      return 'Formato incorrecto';
    }
    return '';
  }

  limpiarForm(){
    Object.keys(this.guardarServidorForm.controls).forEach((key) => {
      this.guardarServidorForm.get(key)?.setErrors(null);
    });
    this.guardarServidorForm.reset();
  }
}
