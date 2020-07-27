import { Component, OnInit, ViewChild } from '@angular/core';
import { Schedule } from 'src/app/model/schedule-response.interfce';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { HorariosService } from 'src/app/services/horarios.service';
import { HorarioBorrarDialogComponent } from '../horario-borrar-dialog/horario-borrar-dialog.component';
import { HorarioAddDialogComponent } from '../horario-add-dialog/horario-add-dialog.component';
import { HorarioEditDialogComponent } from '../horario-edit-dialog/horario-edit-dialog.component';
import { ScheduleDto } from '../../model/schedule.dto';

@Component({
  selector: 'app-horarios-listado',
  templateUrl: './horarios-listado.component.html',
  styleUrls: ['./horarios-listado.component.scss']
})
export class HorariosListadoComponent implements OnInit {

  dataSource: MatTableDataSource<Schedule>;
  listadoHorarios: Schedule[];
  displayedColumns: string[] = ['dia', 'hora','acciones'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public dialog : MatDialog,
    private horarioService: HorariosService
  ) { }

  ngOnInit() {
    this.loadHorarios();
  }

  loadHorarios(){
    this.horarioService.getHorarios().subscribe(resp => {
      console.log(resp);
      this.listadoHorarios = resp;
      this.dataSource = new MatTableDataSource<Schedule>(this.listadoHorarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor =(item, property) =>{
        switch(property){
          case 'dia' : return item.dia;
          case 'hora' : return item.hora;
        }
      };
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (horario, filter) => {
        const dataStr = horario.dia.toLowerCase() + " " + horario.hora.toLowerCase();
        return dataStr.indexOf(filter) != -1;
      };
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dialogoDeleteHorario(idhorario : string){
    let dialogRef = this.dialog.open(HorarioBorrarDialogComponent, {
      width: '300px',
      data: {idhorario : idhorario}
    });
  }

  dialogoAddHorario(){
    let dialogRef = this.dialog.open(HorarioAddDialogComponent, {
      width: '300px'
    });
  }

  dialogoEditHorario(idhorario : string, horarioToEdit: ScheduleDto){
    let dialogRef = this.dialog.open(HorarioEditDialogComponent, {
      width: '300px',
      data: {idhorario : idhorario, horario: horarioToEdit}
    });
  }
}
