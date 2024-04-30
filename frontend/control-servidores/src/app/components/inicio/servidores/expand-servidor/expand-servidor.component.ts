import { Component, Input } from '@angular/core';
import { Catalogo_Servidor } from '../../../../models/catalogo_servidor.model';
import { ServidoresService } from '../../../../services/servidores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../../models/usuario.model';
import { LoginService } from '../../../../services/login.service';
import Swal from 'sweetalert2';
import { Catalogo_DetalleServidor } from '../../../../models/catalogo_detalleservidor.model';
import { MatDialog } from '@angular/material/dialog';
import { AgregarDetalleServidorComponent } from '../agregar-detalle-servidor/agregar-detalle-servidor.component';

@Component({
  selector: 'app-expand-servidor',
  templateUrl: './expand-servidor.component.html',
  styleUrl: './expand-servidor.component.css',
})
export class ExpandServidorComponent {
  //Se añaden en este array los tipos de servidores
  tipo_serv: any[] = [
    { value: 'Tester', viewValue: 'Tester' },
    { value: 'Desarrollo', viewValue: 'Desarrollo' },
    { value: 'Produccion', viewValue: 'Produccion' },
  ];

  @Input() servidor: Catalogo_Servidor;

  public usuario: Usuario;

  Catalogo_detalles: Catalogo_DetalleServidor[];

  public actualizarServidorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servidoresService: ServidoresService,
    private loginService: LoginService,
    public ventana: MatDialog
  ) {
    this.usuario = loginService.usuario;
  }

  ngOnInit(): void {
    this.actualizarServidorForm = this.fb.group({
      Id: [this.servidor.Id, Validators.required],
      Nombre: [this.servidor.Nombre, Validators.required],
      Descripcion: [this.servidor.Descripcion, Validators.required],
      Tipo: [this.servidor.Tipo, Validators.required],
      Fecha: [this.servidor.FechaModificacion],
      NoColaborador: [this.servidor.NoColaborador, Validators.required],
    });

    this.obtenerDetalles();
  }

  actualizarServidor() {
    this.servidoresService
      .actualizarServidor(this.actualizarServidorForm.value)
      .subscribe({
        next: (resp: any) => {
          const { Id, Nombre, Descripcion, NoColaborador, Tipo } =
            this.actualizarServidorForm.value;

          this.servidor.Id = Id;
          this.servidor.Nombre = Nombre;
          this.servidor.Descripcion = Descripcion;
          this.servidor.NoColaborador = NoColaborador;
          this.servidor.Tipo = Tipo;
          Swal.fire('Servidor actualizado', resp.msg, 'success');
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        },
      });
  }

  obtenerDetalles() {
    this.servidoresService
      .getDetalles(this.servidor.Id)
      .subscribe((resp: any) => {
        if (resp.detalles && resp.detalles.length !== 0) {
          this.Catalogo_detalles = resp.detalles;
          console.log(this.Catalogo_detalles)
        }
      });
  }

  ventanaAgregarDetalle(){
    const dialogRef = this.ventana.open(AgregarDetalleServidorComponent,{
      width: '70%',
      height: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { IdServidor: this.servidor.Id}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(result);
      this.obtenerDetalles();
    });
  }

  //handler para mostrar mensajes de error
  MensajeError(nombre_campo: string) {
    const campo = this.actualizarServidorForm.get(nombre_campo);
    if (campo?.hasError('required')) {
      return 'Campo requerido';
    }
    if (campo?.hasError('pattern')) {
      return 'Formato incorrecto';
    }
    return '';
  }
}
