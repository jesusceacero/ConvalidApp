import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginResponse } from '../model/login-response.interface';
import { LoginDto } from '../model/login.dto';

const TOKEN: String = localStorage.getItem('token')

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + TOKEN
  })
};


const baseUrl = "https://convalid-app.herokuapp.com/users";
//const baseUrl = "http://localhost:3000/users";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  doLogin(userlogin: LoginDto): Observable<loginResponse> {

    return this.http.post<loginResponse>(
      baseUrl + "/login/admin",
      userlogin,
      httpOptions
    );
  }

  setLoginData(loginResponse: loginResponse) {
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('fullname', loginResponse.usuario.fullname);
    localStorage.setItem('email', loginResponse.usuario.email);
    localStorage.setItem('role', loginResponse.usuario.role);
    localStorage.setItem('birthdate', loginResponse.usuario.birthdate);
  }

  removeLoginData() {
    localStorage.clear();
  }

  getLocalData(key: string) {
    return localStorage.getItem(key);
  }
}
