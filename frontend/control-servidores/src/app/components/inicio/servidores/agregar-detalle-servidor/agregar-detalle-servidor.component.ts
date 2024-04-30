import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServidoresService } from '../../../../services/servidores.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-detalle-servidor',
  templateUrl: './agregar-detalle-servidor.component.html',
  styleUrl: './agregar-detalle-servidor.component.css'
})
export class AgregarDetalleServidorComponent {

  tipo_serv: any[] = [
    { value: 'Tester', viewValue: 'Tester' },
    { value: 'Desarrollo', viewValue: 'Desarrollo' },
    { value: 'Produccion', viewValue: 'Produccion' },
  ];

  estatusdisponible: any[] = [
    { value: 'Activo', viewValue: 'Activo' },
    { value: 'Inactivo', viewValue: 'Inactivo' },
  ];

  public agregarDetalleForm: FormGroup;

  constructor(private fb: FormBuilder, private servidoresSerivce: ServidoresService,
    public dialogRef: MatDialogRef<AgregarDetalleServidorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }

  ngOnInit(): void {
    this.agregarDetalleForm = this.fb.group({
      IdServidor: [this.data.IdServidor, Validators.required],
      IpDireccion: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
          ),
        ],
      ],
      Dns: ['', Validators.required],
      Tipo: ['', Validators.required],
      NoVersion: ['', Validators.required],
      Estatus: ['', Validators.required],
      Hostname: ['', Validators.required],
      SistemaOperativo: ['', Validators.required],
      VersionSO: ['', Validators.required],
      VersionBD: ['', Validators.required],
    })
  }

  guardarDetalle(){
    this.servidoresSerivce.guardaDetalle(this.agregarDetalleForm.value).subscribe({
      next: (resp:any) => {
        Swal.fire('Detalle del servidor agregado', resp.msg, 'success');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    })
  }

  MensajeError(nombre_campo: string) {
    const campo = this.agregarDetalleForm.get(nombre_campo);
    if (campo?.hasError('required')) {
      return 'Campo requerido';
    }
    if (campo?.hasError('pattern')) {
      return 'Formato incorrecto';
    }
    return '';
  }

  limpiarForm(){
    Object.keys(this.agregarDetalleForm.controls).forEach((key) => {
      this.agregarDetalleForm.get(key)?.setErrors(null);
    });
    this.agregarDetalleForm.reset();
  }
}
