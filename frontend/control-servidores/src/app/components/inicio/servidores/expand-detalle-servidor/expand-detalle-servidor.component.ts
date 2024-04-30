import { Component, Input } from '@angular/core';
import { Catalogo_DetalleServidor } from '../../../../models/catalogo_detalleservidor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServidoresService } from '../../../../services/servidores.service';
import { LoginService } from '../../../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expand-detalle-servidor',
  templateUrl: './expand-detalle-servidor.component.html',
  styleUrl: './expand-detalle-servidor.component.css',
})
export class ExpandDetalleServidorComponent {
  tipo_serv: any[] = [
    { value: 'Tester', viewValue: 'Tester' },
    { value: 'Desarrollo', viewValue: 'Desarrollo' },
    { value: 'Produccion', viewValue: 'Produccion' },
  ];

  estatusdisponible: any[] = [
    { value: 'Activo', viewValue: 'Activo' },
    { value: 'Inactivo', viewValue: 'Inactivo' },
  ];

  @Input() detalle: Catalogo_DetalleServidor;

  public actualizarDetalleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servidoresService: ServidoresService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.actualizarDetalleForm = this.fb.group({
      Id: [this.detalle.Id, Validators.required],
      IdServidor: [this.detalle.IdServidor, Validators.required],
      IpDireccion: [
        this.detalle.IpDireccion,
        [
          Validators.required,
          Validators.pattern(
            '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
          ),
        ],
      ],
      Dns: [this.detalle.Dns, Validators.required],
      Tipo: [this.detalle.Tipo, Validators.required],
      NoVersion: [this.detalle.NoVersion, Validators.required],
      Estatus: [this.detalle.Estatus, Validators.required],
      Hostname: [this.detalle.Hostname, Validators.required],
      SistemaOperativo: [this.detalle.SistemaOperativo, Validators.required],
      VersionSO: [this.detalle.VersionSO, Validators.required],
      VersionBD: [this.detalle.VersionBD, Validators.required],
      FechaModificacion: [this.detalle.FechaModificacion, Validators.required],
      NoColaborador: [this.detalle.NoColaborador, Validators.required],
    });
  }

  actualizarDetalle() {
    this.servidoresService
      .actualizaDetalle(this.actualizarDetalleForm.value)
      .subscribe({
        next: (resp: any) => {
          const {
            IpDireccion,
            Dns,
            Tipo,
            NoVersion,
            Estatus,
            Hostname,
            SistemaOperativo,
            VersionBD,
            VersionSO,
          } = this.actualizarDetalleForm.value;
          this.detalle.IpDireccion = IpDireccion;
          this.detalle.Dns = Dns;
          this.detalle.Tipo = Tipo;
          this.detalle.NoVersion = NoVersion;
          this.detalle.Estatus = Estatus;
          this.detalle.Hostname = Hostname;
          this.detalle.SistemaOperativo = SistemaOperativo;
          this.detalle.VersionBD = VersionBD;
          this.detalle.VersionSO = VersionSO;
          Swal.fire('Detalle del servidor actualizado', resp.msg, 'success');
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        },
      });
  }

  //handler para mostrar mensajes de error
  MensajeError(nombre_campo: string) {
    const campo = this.actualizarDetalleForm.get(nombre_campo);
    if (campo?.hasError('required')) {
      return 'Campo requerido';
    }
    if (campo?.hasError('pattern')) {
      return 'Formato incorrecto';
    }
    return '';
  }
}
