import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { HorariosService } from '../../services/horarios.service';
import { ModulosService } from '../../services/modulos.service';
import { User } from '../../model/user.interface';
import { Schedule } from '../../model/schedule-response.interfce';
import { ModuloCrudDTO } from '../../model/module-crud.dto';
import { Course } from '../../model/course-response.interface';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-modulos-edit-dialog',
  templateUrl: './modulos-edit-dialog.component.html',
  styleUrls: ['./modulos-edit-dialog.component.scss']
})
export class ModulosEditDialogComponent implements OnInit {

  moduloToEdit: ModuloCrudDTO;
  listadoUsuarioProfesor: User[];
  listadoHorario: Schedule[];
  listadoCursos: Course[];
  lunes: Schedule[];
  martes: Schedule[];
  miercoles: Schedule[];
  jueves: Schedule[];
  viernes: Schedule[];

  constructor(
    public dialogRef: MatDialogRef<ModulosEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private moduloService: ModulosService,
    private horarioService : HorariosService,
    private cursoService : CursosService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.loadHorarios();
    this.loadUsuarios();
    this.loadCursos();
    this.lunes = [];
    this.martes = [];
    this.miercoles = [];
    this.jueves = [];
    this.viernes = [];
    this.moduloToEdit = new ModuloCrudDTO();
  }

  editModulo() {
    console.log("entra aqui");
    console.log(this.moduloToEdit);
    
    this.moduloService.editModulo(this.data.idmodulo, this.moduloToEdit).subscribe(resp => {
      this.snackBar.open("Modulo editado correctamente.");
      this.dialogRef.close();
      location.reload();
    });
    
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

  loadHorarios(){
    this.horarioService.getHorarios().subscribe(resp => {
      console.log(resp);
      this.listadoHorario = resp;
      for (let i = 0; i < resp.length; i++) {
        switch (resp[i].dia.toLowerCase()) {
          case "lunes":
            this.lunes.push(resp[i]);
            break;
          case "martes":
            this.martes.push(resp[i]);
            break;
          case "miercoles":
            this.miercoles.push(resp[i]);
            break;
          case "jueves":
            this.jueves.push(resp[i]);
            break;
          case "viernes":
            this.viernes.push(resp[i]);
            break;
        
          default:
            break;
        }
      }    
    });
  }

  loadUsuarios(){
    this.moduloService.getUsersProfesores().subscribe(resp => {
      console.log(resp);
      this.listadoUsuarioProfesor = resp;    
    });
  }

  loadCursos(){
    this.cursoService.getCursos().subscribe(resp => {
      console.log(resp);
      this.listadoCursos = resp;
    });
  }
}
