import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Course } from 'src/app/model/course-response.interface';
import { CursosService } from 'src/app/services/cursos.service';
import { CursosBorrarDialogComponent } from '../cursos-borrar-dialog/cursos-borrar-dialog.component';
import { CursosAddDialogComponent } from '../cursos-add-dialog/cursos-add-dialog.component';
import { CourseDto } from '../../model/course.dto';
import { CursosEditDialogComponent } from '../cursos-edit-dialog/cursos-edit-dialog.component';

@Component({
  selector: 'app-cursos-listado',
  templateUrl: './cursos-listado.component.html',
  styleUrls: ['./cursos-listado.component.scss']
})
export class CursosListadoComponent implements OnInit {

  dataSource: MatTableDataSource<Course>;
  listaCursos: Course[];
  displayedColumns: string[] = ['nombre', 'acronimo','acciones'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public dialog : MatDialog,
    private cursoService: CursosService
  ) { }

  ngOnInit() {
    this.loadCursos();
  }

  loadCursos(){
    this.cursoService.getCursos().subscribe(resp => {
    console.log(resp);
    this.listaCursos = resp;
    this.dataSource = new MatTableDataSource<Course>(this.listaCursos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor =(item, property) =>{
      switch(property){
        case 'nombre' : return item.name;
        case 'acronimo' : return item.acronym;
      }
    };
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (curso, filter) => {
      const dataStr = curso.name.toLowerCase() + " " + curso.acronym.toLowerCase();
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

  dialogoDeleteCurso(idCurso : string){
    let dialogRef = this.dialog.open(CursosBorrarDialogComponent, {
      width: '300px',
      data: {idCurso : idCurso}
    });
  }

  dialogoAddCurso(){
    let dialogRef = this.dialog.open(CursosAddDialogComponent, {
      width: '300px'
    });
  }

  dialogoEditCurso(idcurso : string, cursoToEdit: CourseDto){
    let dialogRef = this.dialog.open(CursosEditDialogComponent, {
      width: '300px',
      data: {idcurso : idcurso, curso: cursoToEdit}
    });
  }

}
