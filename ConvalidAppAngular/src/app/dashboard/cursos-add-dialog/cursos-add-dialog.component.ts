import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CursosService } from '../../services/cursos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseDto } from '../../model/course.dto';

@Component({
  selector: 'app-cursos-add-dialog',
  templateUrl: './cursos-add-dialog.component.html',
  styleUrls: ['./cursos-add-dialog.component.scss']
})
export class CursosAddDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CursosAddDialogComponent>,
    private cursoService : CursosService,
    private snackBar : MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      acronym: [null, Validators.compose([Validators.required])]
    });
  }

  addCurso() {
    const cursoDto = <CourseDto>this.form.value;
    this.cursoService.addCurso(cursoDto).subscribe(resp => {
      this.snackBar.open("Curso añadido correctamente.");
      this.dialogRef.close();
      location.reload();
    });
  }

  cerrarDialog() {
    this.dialogRef.close();
  }
}
