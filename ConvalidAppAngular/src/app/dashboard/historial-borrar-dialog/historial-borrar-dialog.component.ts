import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HistorialService } from 'src/app/services/historial.service';

export interface DatosEntradaDialog {
  idHistoria : string;
}

@Component({
  selector: 'app-historial-borrar-dialog',
  templateUrl: './historial-borrar-dialog.component.html',
  styleUrls: ['./historial-borrar-dialog.component.scss']
})
export class HistorialBorrarDialogComponent implements OnInit {

  idHistoria : string;

  constructor(public dialogRef: MatDialogRef<HistorialBorrarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private historialoService : HistorialService,
    private snackBar : MatSnackBar) { }

  ngOnInit() {
    this.idHistoria = this.data.idHistoria;
  }

  confirmarBorrado(){
    this.historialoService.deleteHistoria(this.idHistoria).subscribe(resp => {
      this.snackBar.open("Historia borrado correctamente")
      this.dialogRef.close();
      location.reload();
    });
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
