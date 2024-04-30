import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from '../../../../services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-servicio',
  templateUrl: './agregar-servicio.component.html',
  styleUrl: './agregar-servicio.component.css',
})
export class AgregarServicioComponent {
  public guardarServicioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviciosService: ServiciosService
  ) {}
  ngOnInit(): void {
    this.guardarServicioForm = this.fb.group({
      Nombre: ['', Validators.required],
      UrlProduccion: ['', Validators.required],
      IpProduccion: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
          ),
        ],
      ],
      UrlDesarrollo: [, Validators.required],
      IpDesarrollo: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
          ),
        ],
      ],
      UrlTester: ['', Validators.required],
      IpTester: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
          ),
        ],
      ],
      Dns: ['', Validators.required],
      Usuario: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }


  guardarServicio(){
    if(this.guardarServicioForm.invalid){
      return;
    }
    this.serviciosService.guardarServicio(this.guardarServicioForm.value).subscribe({
      next: (resp:any) => {
        Swal.fire('Servicio agregado',resp.msg, 'success');
      },
      error: (err) => {
        Swal.fire('Ocurrió un error', err.error.msg, 'error');
      }
    })
  }
  //handler para mostrar mensajes de error
  MensajeError(nombre_campo: string) {
    const campo = this.guardarServicioForm.get(nombre_campo);
    if (campo?.hasError('required')) {
      return 'Campo requerido';
    }
    if (campo?.hasError('pattern')) {
      return 'Formato incorrecto';
    }
    return '';
  }

  limpiarForm(){
    Object.keys(this.guardarServicioForm.controls).forEach((key) => {
      this.guardarServicioForm.get(key)?.setErrors(null);
    });
    this.guardarServicioForm.reset();
  }
}
