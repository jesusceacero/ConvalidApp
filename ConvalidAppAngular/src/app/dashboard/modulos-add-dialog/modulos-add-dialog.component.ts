import { Component, OnInit } from '@angular/core';
import { ModulosService } from '../../services/modulos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { User } from '../../model/user.interface';
import { Schedule } from '../../model/schedule-response.interfce';
import { HorariosService } from '../../services/horarios.service';
import { ModuloCrudDTO } from '../../model/module-crud.dto';
import { CursosService } from '../../services/cursos.service';
import { Course } from '../../model/course-response.interface';

@Component({
  selector: 'app-modulos-add-dialog',
  templateUrl: './modulos-add-dialog.component.html',
  styleUrls: ['./modulos-add-dialog.component.scss']
})
export class ModulosAddDialogComponent implements OnInit {

  public form: FormGroup;
  listadoUsuarioProfesor: User[];
  listadoHorario: Schedule[];
  listadoCursos: Course[];
  lunes: Schedule[];
  martes: Schedule[];
  miercoles: Schedule[];
  jueves: Schedule[];
  viernes: Schedule[];

  constructor(
    public dialogRef: MatDialogRef<ModulosAddDialogComponent>,
    private modulosService : ModulosService,
    private horariosService : HorariosService,
    private cursoService : CursosService,
    private snackBar : MatSnackBar,
    private fb: FormBuilder
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
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      acronym: [null, Validators.compose([Validators.required])],
      teacher: [null, Validators.compose([Validators.required])],
      horario: [[], Validators.compose([Validators.required])],
      course: [null, Validators.compose([Validators.required])]
    });
  }

  addModulo() {
    const moduloDto = <ModuloCrudDTO>this.form.value;
    this.modulosService.addModulo(moduloDto).subscribe(resp => {
      this.snackBar.open("Modulo añadido correctamente.")
      this.dialogRef.close();
      location.reload();
    });
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

  loadHorarios(){
    this.horariosService.getHorarios().subscribe(resp => {
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
    this.modulosService.getUsersProfesores().subscribe(resp => {
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
