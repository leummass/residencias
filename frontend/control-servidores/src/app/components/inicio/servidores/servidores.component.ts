import { Component, ViewChild } from '@angular/core';
import { Catalogo_DetalleServidor } from '../../../models/catalogo_detalleservidor.model';
import { MatDialog } from '@angular/material/dialog';
import { DatosService } from '../../../services/datos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Catalogo_Servidor } from '../../../models/catalogo_servidor.model';
import { MatTableDataSource } from '@angular/material/table';


const ELEMENT_DATA: Catalogo_Servidor[] = [
  {Nombre: "Servidor 19", Tipo: 'Desarrollo', IpDireccion: "10.49.50.15", Estatus: 'H'},
  {Nombre: "Servidor 18", Tipo: 'Desarrollo', IpDireccion: "10.49.50.15", Estatus: 'He'},
  {Nombre: "Servidor 17", Tipo: 'Tester', IpDireccion: "10.49.50.15", Estatus: 'Li'},
  {Nombre: "Servidor 16", Tipo: 'Tester', IpDireccion: "10.49.50.15", Estatus: 'Be'},
  {Nombre: "Servidor 15", Tipo: 'Produccion', IpDireccion: "10.49.50.15", Estatus: 'B'},
  {Nombre: "Servidor 14", Tipo: 'Produccion', IpDireccion: "10.49.50.15", Estatus: 'C'},
  {Nombre: "Servidor 13", Tipo: 'Produccion', IpDireccion: "10.49.50.15", Estatus: 'N'},
  {Nombre: "Servidor 12", Tipo: 'Tester', IpDireccion: "10.49.50.15", Estatus: 'O'},
  {Nombre: "Servidor 11", Tipo: 'Tester', IpDireccion: "10.49.50.15", Estatus: 'F'},
  {Nombre: "Servidor 10", Tipo: 'Desarrollo', IpDireccion: "10.49.50.15", Estatus: 'Ne'},
]
@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrl: './servidores.component.css'
})
export class ServidoresComponent {
  displayedColumns: string[] = ['IpProduccion', 'Nombre', 'Tipo', 'Estatus'];
  dataSource = new MatTableDataSource<Catalogo_Servidor>(ELEMENT_DATA);
  form: FormGroup;
  nombre: string;
  peso: string;
  detalle_servidors: Catalogo_DetalleServidor[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tipo_serv: any[] = [
    { value: '', viewValue: 'Todos' },
    { value: 'Tester', viewValue: 'Tester' },
    { value: 'Desarrollo', viewValue: 'Desarrollo' },
    { value: 'Produccion', viewValue: 'Produccion' },
  ];

  constructor(
    public ventana: MatDialog,
    private datosService: DatosService,
    formBuilder: FormBuilder
  ) {
    this.dataSource.filterPredicate = ((data, filter) => {
      const filters = JSON.parse(filter);
      const a = !filters[1].fIP || data.IpDireccion.includes(filters[1].fIP);
      const b =
        !filters[0].fNombre ||
        data.Nombre.toLowerCase().includes(filters[0].fNombre);
      let c = !filters[2].fTipo;
      if (filters[2].fTipo != '') {
        c = !filters[2].fTipo || data.Tipo === filters[2].fTipo;
      }
      return a && b && c;
    }) as (Catalogo_Servidor: Catalogo_Servidor, string: string) => boolean;

    this.form = formBuilder.group({
      fNombre: '',
      fIP: '',
      fTipo: '',
    });
    this.form.valueChanges.subscribe((value: { fNombre: any; fIP: any; fTipo: any; }) => {
      const filter = [
        { fNombre: value.fNombre },
        { fIP: value.fIP },
        { fTipo: value.fTipo },
      ];
      this.dataSource.filter = JSON.stringify(filter);
    });
  }

  ngOnInit() {
    // this.obtenerServidores();
    // this.obtenerDetalleServidor();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  // obtenerServidores() {
  //   const params = { nombre: '', ipdireccion: '', tipo: '' };

  //   this.datosService.getServidores(params).subscribe((data) => {
  //     this.dataSource.data = data;
  //   });
  // }

  // obtenerDetalleServidor() {
  //   this.datosService.getDetalleServidor().subscribe((data) => {
  //     this.detalle_servidors = data;
  //   });
  // }

  // abrirVentanaAgregar() {
  //   const dialogRef = this.ventana.open(ServidoresAnadirComponent, {
  //     width: '70%',
  //     enterAnimationDuration: '300ms',
  //     exitAnimationDuration: '300ms',
  //     data: { titulo: 'Agregar servidor',edicion:'anadir' },
  //   });
  // }

  // abrirVentanaEditar(servidor: Catalogo_Servidor) {
  //   let datas;
  //   let servidor_tester;
  //   let servidor_produccion;
  //   let servidor_desarrollo;
  //   let ip_tester = '',
  //     ip_produccion = '',
  //     ip_desarrollo = '';
  //   let detalles_servidor: Catalogo_DetalleServidor[] =
  //     this.retornaDetallesServidorFilter(servidor.IdServidor);
  //   console.log(detalles_servidor);
  //   if (this.detalle_servidors.length != 0) {
  //     servidor_tester = this.retornaDetalleServidorFilter(
  //       'tester',
  //       detalles_servidor
  //     );
  //     servidor_produccion = this.retornaDetalleServidorFilter(
  //       'produccion',
  //       detalles_servidor
  //     );
  //     servidor_desarrollo = this.retornaDetalleServidorFilter(
  //       'desarrollo',
  //       detalles_servidor
  //     );
  //     if (servidor_tester != null) {
  //       ip_tester = servidor_tester.IpDireccion;
  //     }
  //     if (servidor_produccion != null) {
  //       ip_produccion = servidor_produccion.IpDireccion;
  //     }
  //     if (servidor_desarrollo != null) {
  //       ip_desarrollo = servidor_desarrollo.IpDireccion;
  //     }
  //     datas = {
  //       nombre: servidor.Nombre,
  //       descripcion: servidor.Descripcion,
  //       tipo: servidor.Tipo,
  //       ip_des: ip_desarrollo,
  //       ip_test: ip_tester,
  //       ip_prod: ip_produccion,
  //       detalle_serv_prod: servidor_produccion,
  //       detalle_serv_test: servidor_tester,
  //       detalle_serv_des: servidor_desarrollo,
  //       edicion: 'editar',
  //       titulo: 'Editar servidor'
  //     };
  //   }

  //   const dialogRef = this.ventana.open(ServidoresAnadirComponent, {
  //     width: '70%',
  //     enterAnimationDuration: '300ms',
  //     exitAnimationDuration: '300ms',
  //     data: datas,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if(result != undefined){
  //       servidor_tester = result.detalle_servidor_des;
  //       servidor_produccion = result.detalle_servidor_prod;
  //       servidor_desarrollo = result.detalle_servidor_test
  //       console.log('des', servidor_desarrollo);
  //       console.log('prod', servidor_produccion);
  //       console.log('test', servidor_desarrollo);
  //     }
  //   });
  // }
  // //Retorna el registro detalle de un servidor en base a su tipo(tester, produccion, desarrollo)
  // retornaDetalleServidorFilter(
  //   tipo: string,
  //   listado_detalles: Catalogo_DetalleServidor[]
  // ) {
  //   let servidor_coinc;
  //   servidor_coinc = listado_detalles.filter((obj) => {
  //     return obj.Tipo.toLowerCase() === tipo.toLowerCase();
  //   });
  //   if (servidor_coinc != null) {
  //     return servidor_coinc[0];
  //   }
  //   return null;
  // }
  // //Retorna los detalles de un servidor en base a su id que conecta con la tabla Catalogo_DetalleServidor
  // retornaDetallesServidorFilter(IdServidor: number) {
  //   let servidores_coinc: Catalogo_DetalleServidor[];
  //   servidores_coinc = this.detalle_servidors.filter((obj) => {
  //     return obj.IdServidor === IdServidor;
  //   });

  //   return servidores_coinc;
  // }
}
