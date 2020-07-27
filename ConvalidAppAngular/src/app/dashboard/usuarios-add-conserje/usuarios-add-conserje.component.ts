import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDto } from 'src/app/model/user.dto';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-add-conserje',
  templateUrl: './usuarios-add-conserje.component.html',
  styleUrls: ['./usuarios-add-conserje.component.scss']
})
export class UsuariosAddConserjeComponent implements OnInit {

  public form: FormGroup;
  userDto: UserDto;

  constructor(
    private fb: FormBuilder,
    private userService: UsuariosService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.userDto = new UserDto();
    this.form = this.fb.group({
      fullname: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])]
    })
  }

  addConserje() {
    if (this.form.value.email.includes("@triana.salesianos.edu")) {
      this.userDto.fullname = this.form.value.fullname;
      this.userDto.email = this.form.value.email;
      this.userDto.role = "CONSERJE";
      this.userDto.permissions = true;
      this.userDto.course = null;
      this.userDto.convalidados = [];
      this.userDto.extras = [];
      this.userDto.imparte = [];
      this.userDto.birthdate = "";
      this.userDto.password = "";
      console.log(this.userDto);
      this.userService.putUsuario(this.userDto).subscribe(resp => {
        console.log(resp);
        this.snackBar.open("Conserje añadido correctamente.");
        this.router.navigate(['admin/users']);
      });
    }else{
      this.snackBar.open("El correo electronico debe ser el corporativo(@triana.salesianos.edu).");
    }
  }
}
