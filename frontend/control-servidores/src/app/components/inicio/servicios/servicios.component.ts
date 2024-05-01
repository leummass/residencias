import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Catalogo_Servicio } from '../../../models/catalogo_servicio.model';
import { ServiciosService } from '../../../services/servicios.service';
import Swal from 'sweetalert2';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AgregarServicioComponent } from './agregar-servicio/agregar-servicio.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
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
  dataSource = new MatTableDataSource<Catalogo_Servicio>();

  expandedElement: Catalogo_Servicio | null;

  form: FormGroup; //usado para filtrar
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public ventana: MatDialog,
    formBuilder: FormBuilder,
    private serviciosService: ServiciosService
  ) {
    this.dataSource.filterPredicate = ((data, filter) => {
      const filters = JSON.parse(filter);
      let a =
        !filters[0].fNombre ||
        data.Nombre.toLowerCase().includes(filters[0].fNombre);
      let b =
        !filters[1].fUrl ||
        data.UrlProduccion.toLowerCase().includes(filters[1].fUrl);
      let c =
        !filters[2].fIp ||
        data.IpProduccion.toLowerCase().includes(filters[2].fIp);
      let d =
        !filters[3].fDns || data.Dns.toLowerCase().includes(filters[3].fDns);
      return a && b && c && d;
    }) as (Catalogo_Servicio: Catalogo_Servicio, string: string) => boolean;

    this.form = formBuilder.group({
      fNombre: '',
      fUrl: '',
      fIp: '',
      fDns: '',
    });

    this.form.valueChanges.subscribe(
      (value: { fNombre: any; fUrl: any; fIp: any; fDns: any }) => {
        const filter = [
          { fNombre: value.fNombre },
          { fUrl: value.fUrl },
          { fIp: value.fIp },
          { fDns: value.fDns },
        ];
        this.dataSource.filter = JSON.stringify(filter);
      }
    );
  }

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
    const dialogRef = this.ventana.open(AgregarServicioComponent, {
      width: '70%',
      height: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
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
