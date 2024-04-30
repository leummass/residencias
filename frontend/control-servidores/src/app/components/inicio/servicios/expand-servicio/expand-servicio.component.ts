import { Component, Input } from '@angular/core';
import { Catalogo_Servicio } from '../../../../models/catalogo_servicio.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from '../../../../services/servicios.service';
import { LoginService } from '../../../../services/login.service';
import { Usuario } from '../../../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expand-servicio',
  templateUrl: './expand-servicio.component.html',
  styleUrl: './expand-servicio.component.css',
})
export class ExpandServicioComponent {
  //Recibe el servicio del componente padre, que es la fila de la tabla a la que
  //se hizo click
  @Input() servicio: Catalogo_Servicio;

  public usuario: Usuario;

  public actualizarServicioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviciosService: ServiciosService,
    private loginService: LoginService
  ) {
    this.usuario = loginService.usuario;
  }

  ngOnInit(): void {
    this.actualizarServicioForm = this.fb.group({
      Id: [this.servicio.Id, Validators.required],
      Nombre: [this.servicio.Nombre, Validators.required],
      UrlProduccion: [this.servicio.UrlProduccion, Validators.required],
      IpProduccion: [
        this.servicio.IpProduccion,
        [
          Validators.required,
          Validators.pattern(
            '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
          ),
        ],
      ],
      UrlDesarrollo: [this.servicio.UrlDesarrollo, Validators.required],
      IpDesarrollo: [
        this.servicio.IpDesarrollo,
        [
          Validators.required,
          Validators.pattern(
            '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
          ),
        ],
      ],
      UrlTester: [this.servicio.UrlTester, Validators.required],
      IpTester: [
        this.servicio.IpTester,
        [
          Validators.required,
          Validators.pattern(
            '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
          ),
        ],
      ],
      Dns: [this.servicio.Dns, Validators.required],
      Usuario: [this.servicio.Usuario, Validators.required],
      Password: [this.servicio.Password, Validators.required],
      Fecha: [this.servicio.FechaModificacion],
      NoColaborador: [this.servicio.NoColaborador, Validators.required],
    });
  }

  actualizarServicio() {
    this.serviciosService
      .actualizarServicio(this.actualizarServicioForm.value)
      .subscribe({
        next: (resp:any) => {
          const {
            Id,
            Nombre,
            UrlProduccion,
            IpProduccion,
            UrlDesarrollo,
            IpDesarrollo,
            UrlTester,
            IpTester,
            Dns,
            Usuario,
            Password,
            NoColaborador,
          } = this.actualizarServicioForm.value;
          this.servicio.Id = Id;
          this.servicio.Nombre = Nombre;
          this.servicio.UrlProduccion = UrlProduccion;
          this.servicio.IpProduccion = IpProduccion;
          this.servicio.UrlDesarrollo = UrlDesarrollo;
          this.servicio.IpDesarrollo = IpDesarrollo;
          this.servicio.UrlTester = UrlTester;
          this.servicio.IpTester = IpTester;
          this.servicio.Dns = Dns;
          this.servicio.Usuario = Usuario;
          this.servicio.Password = Password;
          this.servicio.NoColaborador = this.usuario.NoColaborador;

          Swal.fire('Servicio actualizado',resp.msg, 'success');
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        },
      });
  }

  //handler para mostrar mensajes de error
  MensajeError(nombre_campo: string) {
    const campo = this.actualizarServicioForm.get(nombre_campo);
    if (campo?.hasError('required')) {
      return 'Campo requerido';
    }
    if (campo?.hasError('pattern')) {
      return 'Formato incorrecto';
    }
    return '';
  }
}
