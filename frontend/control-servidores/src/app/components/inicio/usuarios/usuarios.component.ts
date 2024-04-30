import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';

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

  Catalogo_Usuarios: Usuario[];

  dataSource = new MatTableDataSource<Usuario>();

  expandedElement: Usuario | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public ventana: MatDialog, private usuariosService: UsuariosService){}

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
