import { Component, OnInit, Inject } from '@angular/core';
import { ModulosService } from 'src/app/services/modulos.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

export interface DatosEntradaDialog {
  idModulo : string;
}

@Component({
  selector: 'app-modulos-borrar-dialog',
  templateUrl: './modulos-borrar-dialog.component.html',
  styleUrls: ['./modulos-borrar-dialog.component.scss']
})
export class ModulosBorrarDialogComponent implements OnInit {

  idModulo : string;

  constructor(
    public dialogRef: MatDialogRef<ModulosBorrarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private mooduloService : ModulosService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.idModulo = this.data.idModulo;
  }

  confirmarBorrado(){
    this.mooduloService.deleteModulo(this.idModulo).subscribe(resp => {
      this.snackBar.open("Modulo borrado correctamente")
      this.dialogRef.close();
      location.reload();
    });
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
