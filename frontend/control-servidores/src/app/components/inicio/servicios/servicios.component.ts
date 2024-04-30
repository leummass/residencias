import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Catalogo_Servicio } from '../../../models/catalogo_servicio.model';
import { ServiciosService } from '../../../services/servicios.service';
import Swal from 'sweetalert2';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AgregarServicioComponent } from './agregar-servicio/agregar-servicio.component';


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ServiciosComponent {
  displayedColumns: string[] = [
    'Nombre',
    'UrlProduccion',
    'IpProduccion',
    'Dns',
  ];
  Catalogo_Servicios: Catalogo_Servicio[];
  dataSource = new MatTableDataSource<Catalogo_Servicio>()

  expandedElement: Catalogo_Servicio | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public ventana: MatDialog,
    private serviciosService: ServiciosService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.obtenerServicios();
  }

  //Trae los servicios de la base de datos
  obtenerServicios() {
    this.serviciosService.getServicios().subscribe((resp) => {
      if (resp.servicios.length !== 0 && resp.servicios) {
        this.Catalogo_Servicios = resp.servicios;
        this.dataSource.data = this.Catalogo_Servicios;
      } else {
        Swal.fire('Error', 'No se encontraron servicios', 'error');
      }
    });
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ventanaAgregarServicio() {
    const dialogRef = this.ventana.open(AgregarServicioComponent,{
      width: '70%',
      height: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.obtenerServicios();
    });
  }
  // abrirVentanaAgregar(){
  //   const dialogRef = this.ventana.open(ServiciosAnadirComponent, {
  //     width: '70%',
  //     enterAnimationDuration: '300ms',
  //     exitAnimationDuration: '300ms',
  //     data: {name: 'XD'},
  //   });
  // }
}
