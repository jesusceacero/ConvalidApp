import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserDto } from '../model/user.dto';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-registro-final',
  templateUrl: './registro-final.component.html',
  styleUrls: ['./registro-final.component.scss']
})
export class RegistroFinalComponent implements OnInit {

  public form: FormGroup;
  regis : boolean;
  userDto: UserDto;
  idRegister : string;
  pass : boolean;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UsuariosService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.regis = false;
    this.pass = false;
    this.userDto = new UserDto();
    this.form = this.fb.group({
      birthdate: [null,Validators.compose([Validators.required])],
      password: [null,Validators.compose([Validators.required])],
      password2: [null,Validators.compose([Validators.required])]
    })
    this.loadRegister();
  }

  loadRegister(){
    this.route.paramMap.subscribe(params => {
      this.idRegister = params.get("id");
      this.userService.getRegister(this.idRegister).subscribe(resp => {
        console.log(resp);
        this.regis = true;
      })
    });
  }

  saveUser(){
    console.log("entra1");
    if(this.form.value.password == this.form.value.password2){
      console.log("entra2");
      this.userDto.password = this.form.value.password;
      this.userDto.birthdate = this.form.value.birthdate;
      this.userService.registerFinal(this.idRegister,this.userDto).subscribe(resp =>{
        this.regis = false;
      })
    }else{
      this.pass = true;
    }
  }

}
