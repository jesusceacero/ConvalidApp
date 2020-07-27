import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { LoginDto } from '../model/login.dto';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.removeLoginData();
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    const userToLog = <LoginDto>this.form.value;
    console.log(userToLog);
    
    this.loginService.doLogin(userToLog).subscribe(res => {
      console.log(res)
      this.loginService.setLoginData(res);
      this.router.navigate(['admin/users']);
    });
  }
}
