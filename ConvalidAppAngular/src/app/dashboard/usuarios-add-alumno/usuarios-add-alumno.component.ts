import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDto } from 'src/app/model/user.dto';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { Course } from 'src/app/model/course-response.interface';
import { Modulo } from 'src/app/model/modulo-respose.interface';
import { ModulosService } from 'src/app/services/modulos.service';
import { ModuloListDTO } from 'src/app/model/moduleList.dto';

@Component({
  selector: 'app-usuarios-add-alumno',
  templateUrl: './usuarios-add-alumno.component.html',
  styleUrls: ['./usuarios-add-alumno.component.scss']
})
export class UsuariosAddAlumnoComponent implements OnInit {

  public form: FormGroup;
  userDto: UserDto;
  listadoCursos: Course[];
  listadoConvalidar: Modulo[];
  listadoExtras: Modulo[];

  constructor(
    private fb: FormBuilder,
    private userService: UsuariosService,
    private snackBar : MatSnackBar,
    private router: Router,
    private cursoService : CursosService,
    private modulosService : ModulosService
  ) { }

  ngOnInit() {
    this.loadCursos();
    this.userDto = new UserDto();
    this.form = this.fb.group({
      fullname: [null,Validators.compose([Validators.required])],
      email: [null,Validators.compose([Validators.required])],
      permiso: [null, Validators.compose([Validators.required])],
      course: [null, Validators.compose([Validators.required])],
      convalidadas: [],
      courseExtra: null,
      extras: []
    })
  }

  loadCursos(){
    this.cursoService.getCursos().subscribe(resp => {
      console.log(resp);
      this.listadoCursos = resp;
    });
  }

  loadConvalidados(){
    let ids = new  ModuloListDTO();
    ids.modules = this.form.value.course.modules;
    console.log(this.form.value.convalidadas);
    
    this.modulosService.getModulosArray(ids).subscribe(resp=> {
      this.listadoConvalidar = resp;
      console.log(resp);
    });
  }

  loadExtras(){
    let idsExtra = new ModuloListDTO();
    idsExtra.modules = this.form.value.courseExtra.modules

    this.modulosService.getModulosArray(idsExtra).subscribe(resp =>{
      this.listadoExtras= resp;
    });
  }

  addUsuario(){
    if(this.form.value.email.includes("@triana.salesianos.edu")){
      this.userDto.fullname = this.form.value.fullname;
      this.userDto.email = this.form.value.email;
      this.userDto.role = "USER";
      this.userDto.permissions = this.form.value.permiso;
      this.userDto.course = this.form.value.course._id
      if(this.form.value.convalidadas != null){
        this.userDto.convalidados = this.form.value.convalidadas;
      }else{
        this.userDto.convalidados = [];
      }

      if(this.form.value.convalidadas != null){
        this.userDto.extras = this.form.value.extras;
      }else{
        this.userDto.extras = [];
      }
      
      this.userDto.imparte = [];
      this.userDto.birthdate = "";
      this.userDto.password = "";
      console.log(this.userDto);
      this.userService.putUsuario(this.userDto).subscribe(resp =>{
        console.log(resp);
        this.snackBar.open("Alumno añadido correctamente.");
        this.router.navigate(['admin/users']);
      });
    }else{
      this.snackBar.open("El correo electronico debe ser el corporativo (@triana.salesianos.edu).");
    }
  }

}
