import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Historial } from 'src/app/model/historial-response.interface';
import { HistorialService } from 'src/app/services/historial.service';
import { HistorialBorrarDialogComponent } from '../historial-borrar-dialog/historial-borrar-dialog.component';
import { HistorialDto } from 'src/app/model/historial.dto';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HorariosService } from 'src/app/services/horarios.service';
import { ModulosService } from 'src/app/services/modulos.service';

@Component({
  selector: 'app-historial-listado',
  templateUrl: './historial-listado.component.html',
  styleUrls: ['./historial-listado.component.scss']
})
export class HistorialListadoComponent implements OnInit {

  dataSource: MatTableDataSource<HistorialDto>;
  listaHitorias: HistorialDto[];
  displayedColumns: string[] = ['alumno', 'modulo','hora', "acciones"];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public dialog : MatDialog,
    private historialService: HistorialService,
    private usurariosService : UsuariosService,
    private horariosService : HorariosService,
    private modulosService: ModulosService
  ) { }

  ngOnInit() {
    this.loadHistorias();
  }

  loadHistorias(){
    this.historialService.getHitorial().subscribe(resp => {
      console.log(resp);
      this.listaHitorias = [];
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
        this.horariosService.getHorarioID(element.horario).subscribe(resp2 =>{
          this.usurariosService.getUsuarioID(element.user).subscribe(resp3 =>{
            this.modulosService.getModuloID(element.module).subscribe(resp4 => {
              let histo = new HistorialDto();
              histo.id = element.id;
              histo.horario = resp2;
              histo.user = resp3;
              histo.module = resp4;
              histo.fechayhora = element.fechayhora;
              this.listaHitorias.push(histo);
              if(resp[resp.length-1].id === element.id){
                this.cargarTabla();
              }
            });
          });
        });
      }
    });
  }

  cargarTabla(){
    this.dataSource = new MatTableDataSource<HistorialDto>(this.listaHitorias);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor =(item, property) =>{
      switch(property){
        case 'alumno' : return item.user.fullname;
        case 'modulo' : return item.module.name;
        case 'hora' : return item.horario.hora;
      }
    };
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (historia, filter) => {
      const dataStr = historia.user.fullname.toLowerCase() + " " + historia.module.name.toLowerCase() + " " + historia.horario.hora.toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dialogoDeleteHistoria(idhorario : string){
    let dialogRef = this.dialog.open(HistorialBorrarDialogComponent, {
      width: '300px',
      data: {idhorario : idhorario}
    });
  }

}
