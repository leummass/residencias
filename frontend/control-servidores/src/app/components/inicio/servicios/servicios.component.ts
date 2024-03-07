import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatosService } from '../../../services/datos.service';
import { Catalogo_Servicio } from '../../../models/catalogo_servicio.model';


const ELEMENT_DATA: Catalogo_Servicio[] = [
  {Nombre: "Servicio 19", UrlProduccion: 'Hydrogen', IpProduccion: "10.49.50.15", Dns: 'H'},
  {Nombre: "Servicio 18", UrlProduccion: 'Helium', IpProduccion: "10.49.50.15", Dns: 'He'},
  {Nombre: "Servicio 17", UrlProduccion: 'Lithium', IpProduccion: "10.49.50.15", Dns: 'Li'},
  {Nombre: "Servicio 16", UrlProduccion: 'Beryllium', IpProduccion: "10.49.50.15", Dns: 'Be'},
  {Nombre: "Servicio 15", UrlProduccion: 'Boron', IpProduccion: "10.49.50.15", Dns: 'B'},
  {Nombre: "Servicio 14", UrlProduccion: 'Carbon', IpProduccion: "10.49.50.15", Dns: 'C'},
  {Nombre: "Servicio 13", UrlProduccion: 'Nitrogen', IpProduccion: "10.49.50.15", Dns: 'N'},
  {Nombre: "Servicio 12", UrlProduccion: 'Oxygen', IpProduccion: "10.49.50.15", Dns: 'O'},
  {Nombre: "Servicio 11", UrlProduccion: 'Fluorine', IpProduccion: "10.49.50.15", Dns: 'F'},
  {Nombre: "Servicio 10", UrlProduccion: 'Neon', IpProduccion: "10.49.50.15", Dns: 'Ne'},
];
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  displayedColumns: string[] = ['Nombre', 'UrlProduccion', 'IpProduccion', 'Dns'];
  dataSource = new MatTableDataSource<Catalogo_Servicio>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public ventana: MatDialog,private datosService:DatosService){}

  ngOnInit(){
    //this.obtenerServicios();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  obtenerServicios(){
    // this.datosService.getServicios().subscribe( data => {
    //   this.dataSource.data=data;
    // })
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
