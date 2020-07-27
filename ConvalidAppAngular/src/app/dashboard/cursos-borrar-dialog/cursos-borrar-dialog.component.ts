import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CursosService } from 'src/app/services/cursos.service';


export interface DatosEntradaDialog {
  idCurso : string;
}

@Component({
  selector: 'app-cursos-borrar-dialog',
  templateUrl: './cursos-borrar-dialog.component.html',
  styleUrls: ['./cursos-borrar-dialog.component.scss']
})
export class CursosBorrarDialogComponent implements OnInit {

  idCurso : string;

  constructor(
    public dialogRef: MatDialogRef<CursosBorrarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private cursoService : CursosService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.idCurso = this.data.idCurso;
  }

  confirmarBorrado(){
    this.cursoService.deleteCurso(this.idCurso).subscribe(resp => {
      this.snackBar.open("Curso borrado correctamente")
      this.dialogRef.close();
      location.reload();
    });
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
