import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatSnackBar } from '@angular/material';

export interface DatosEntradaDialog {
  idUsuario : string;
}

@Component({
  selector: 'app-usuario-borrar-dialog',
  templateUrl: './usuario-borrar-dialog.component.html',
  styleUrls: ['./usuario-borrar-dialog.component.scss']
})
export class UsuarioBorrarDialogComponent implements OnInit {
  idUsuario : string;

  constructor(
    public dialogRef: MatDialogRef<UsuarioBorrarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private usuarioService : UsuariosService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.idUsuario = this.data.idUsuario;
  }

  confirmarBorrado(){
    this.usuarioService.deleteUSer(this.idUsuario).subscribe(resp => {
      this.snackBar.open("Usuario borrado correctamente")
      this.dialogRef.close();
      location.reload();
    });
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
