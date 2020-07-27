import { Component, OnInit, Inject } from '@angular/core';
import { UserDto } from 'src/app/model/user.dto';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

export interface DatosEntradaDialog {
  id: string;
  usuarioDto : UserDto;
}

@Component({
  selector: 'app-usuarios-edit-dialog',
  templateUrl: './usuarios-edit-dialog.component.html',
  styleUrls: ['./usuarios-edit-dialog.component.scss']
})
export class UsuariosEditDialogComponent implements OnInit {

  usuarioDTO : UserDto;
  id: string;

  constructor(
    public dialogRef: MatDialogRef<UsuariosEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private usuariosService : UsuariosService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.usuarioDTO = new UserDto();
    this.id = this.data.id;
    this.cargarUsuario();
  }

  editUsuario() {
    console.log(this.usuarioDTO);
    this.usuariosService.editUser(this.id,this.usuarioDTO).subscribe(resp=>{
      this.snackBar.open("Usuario editado correctamente.");
      this.dialogRef.close();
      location.reload();
    });
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

  cargarUsuario(){
    this.usuariosService.getUsuarioID(this.id).subscribe(resp=>{
      this.usuarioDTO.fullname = resp.fullname;
      this.usuarioDTO.birthdate = resp.birthdate;
    });
  }

}
