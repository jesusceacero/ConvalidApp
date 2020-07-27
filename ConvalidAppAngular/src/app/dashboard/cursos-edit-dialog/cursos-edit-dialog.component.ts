import { Component, OnInit, Inject } from '@angular/core';
import { CourseDto } from '../../model/course.dto';
import { CursosService } from '../../services/cursos.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cursos-edit-dialog',
  templateUrl: './cursos-edit-dialog.component.html',
  styleUrls: ['./cursos-edit-dialog.component.scss']
})
export class CursosEditDialogComponent implements OnInit {
  
  cursoToEdit : CourseDto;

  constructor(
    public dialogRef: MatDialogRef<CursosEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cursoService : CursosService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.cursoToEdit = new CourseDto();
  }

  editCurso() {
    this.cursoService.editCurso(this.data.idcurso, this.cursoToEdit).subscribe(resp => {
      this.snackBar.open("Curso editado correctamente.");
      this.dialogRef.close();
      location.reload();
    });
  }

  cerrarDialog() {
    this.dialogRef.close();
  }
}
