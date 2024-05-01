import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UsuariosComponent {
  displayedColumns: string[] = [
    '# Colaborador',
    'Tipo',
  ]

  tipo_usuario: any[] = [
    { value: 'Desarrollador', viewValue: 'Desarrollador' },
    { value: 'Tester', viewValue: 'Tester' },
    { value: 'Arquitecto', viewValue: 'Arquitecto' },
    { value: 'Lider', viewValue: 'Lider' },
    { value: 'Gerente', viewValue: 'Gerente' },
  ];

  Catalogo_Usuarios: Usuario[];

  form: FormGroup;

  dataSource = new MatTableDataSource<Usuario>();

  expandedElement: Usuario | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public ventana: MatDialog, private usuariosService: UsuariosService, formBuilder: FormBuilder){
    this.dataSource.filterPredicate = ((data, filter) => {
      const filters = JSON.parse(filter);
      const a = !filters[0].fNoColaborador || data.NoColaborador.toString().includes(filters[0].fNoColaborador)
      let b = !filters[1].fTipo;
      if (filters[1].fTipo != '') {
        b = !filters[1].fTipo || data.Tipo === filters[1].fTipo;
      }
      return a && b;
    }) as (Usuarios: Usuario, string: string) => boolean;

    this.form = formBuilder.group({
      fNoColaborador: '',
      fTipo: '',
    });
    this.form.valueChanges.subscribe(
      (value: { fNoColaborador: any; fTipo: any; }) => {
        const filter = [
          { fNoColaborador: value.fNoColaborador},
          { fTipo: value.fTipo },
        ];
        this.dataSource.filter = JSON.stringify(filter);
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.obtenerUsuarios();
    
  }

  obtenerUsuarios(){
    this.usuariosService.getUsuarios().subscribe((resp) => {
      if(resp.usuarios.length !== 0 && resp.usuarios){
        this.Catalogo_Usuarios = resp.usuarios;
        this.dataSource.data = this.Catalogo_Usuarios;
      } else {
        Swal.fire('Error', 'No se encontraron servicios', 'error');
      }
    })
  }

  ventanaAgregarUsuario(){
    const dialogRef = this.ventana.open(AgregarUsuarioComponent,{
      width: '70%',
      height: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.obtenerUsuarios();
    });
  }
}
