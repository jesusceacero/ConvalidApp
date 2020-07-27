import { Component, OnInit, Inject } from '@angular/core';
import { HorariosService } from 'src/app/services/horarios.service';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DatosEntradaDialog {
  idhorario : string;
}

@Component({
  selector: 'app-horario-borrar-dialog',
  templateUrl: './horario-borrar-dialog.component.html',
  styleUrls: ['./horario-borrar-dialog.component.scss']
})
export class HorarioBorrarDialogComponent implements OnInit {

  idHorario : string;

  constructor(
    public dialogRef: MatDialogRef<HorarioBorrarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private horarioService : HorariosService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.idHorario = this.data.idhorario;
  }

  confirmarBorrado(){
    this.horarioService.deleteHorario(this.idHorario).subscribe(resp => {
      this.snackBar.open("Horario borrado correctamente")
      this.dialogRef.close();
      location.reload();
    });
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
