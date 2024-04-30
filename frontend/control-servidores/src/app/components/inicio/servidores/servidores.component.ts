import { Component, ViewChild } from '@angular/core';
import { Catalogo_DetalleServidor } from '../../../models/catalogo_detalleservidor.model';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Catalogo_Servidor } from '../../../models/catalogo_servidor.model';
import { MatTableDataSource } from '@angular/material/table';
import { ServidoresService } from '../../../services/servidores.service';
import Swal from 'sweetalert2';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AgregarServidorComponent } from './agregar-servidor/agregar-servidor.component';

@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrl: './servidores.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ServidoresComponent {
  displayedColumns: string[] = ['Id', 'Nombre', 'Tipo'];
  Catalogo_Servidores: Catalogo_Servidor[];
  dataSource = new MatTableDataSource<Catalogo_Servidor>();
  
  expandedElement: Catalogo_Servidor | null;

  form: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tipo_serv: any[] = [
    { value: '', viewValue: 'Todos' },
    { value: 'Tester', viewValue: 'Tester' },
    { value: 'Desarrollo', viewValue: 'Desarrollo' },
    { value: 'Produccion', viewValue: 'Produccion' },
  ];

  constructor(public ventana: MatDialog, formBuilder: FormBuilder, private servidoresService: ServidoresService) {
    this.dataSource.filterPredicate = ((data, filter) => {
      const filters = JSON.parse(filter);
      const b =
        !filters[0].fNombre ||
        data.Nombre.toLowerCase().includes(filters[0].fNombre);
      let c = !filters[1].fTipo;
      if (filters[1].fTipo != '') {
        c = !filters[1].fTipo || data.Tipo === filters[1].fTipo;
      }
      return b && c;
    }) as (Catalogo_Servidor: Catalogo_Servidor, string: string) => boolean;

    this.form = formBuilder.group({
      fNombre: '',
      fIP: '',
      fTipo: '',
    });
    this.form.valueChanges.subscribe(
      (value: { fNombre: any; fTipo: any }) => {
        const filter = [
          { fNombre: value.fNombre },
          { fTipo: value.fTipo },
        ];
        this.dataSource.filter = JSON.stringify(filter);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.obtenerServidores();
  }

  obtenerServidores() {
    this.servidoresService.getServidores().subscribe((resp) => {
      if (resp.servidores.length !== 0 && resp.servidores) {
        this.Catalogo_Servidores = resp.servidores;
        this.dataSource.data = this.Catalogo_Servidores;
      } else {
        Swal.fire('Error', 'No se encontraron servidores', 'error');
      }
    });
  }

  ventanaAgregarServidor() {
    const dialogRef = this.ventana.open(AgregarServidorComponent,{
      width: '70%',
      height: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(result);
      this.obtenerServidores();
    });
  }
}
