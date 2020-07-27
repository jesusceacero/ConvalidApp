import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.interface';
import { UserDto } from '../model/user.dto';
import { Register } from '../model/register.interface';

const baseUrl = "https://convalid-app.herokuapp.com/users/";


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  public getUsers() {
    return this.http.get<User[]>(
      baseUrl,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  }

  public deleteUSer(id: string) {
    return this.http.delete<User>(
      baseUrl + id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  }

  public getUsuarioID(id: string) {
    return this.http.get<User>(
      baseUrl + id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  }

  public putUsuario(userDto: UserDto) {
    return this.http.post<User>(
      baseUrl + "register/",
      userDto,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  }

  public getRegister(id: string) {
    return this.http.get<Register>(
      baseUrl + "register/" + id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  }

  public registerFinal(id: string, userDto: UserDto) {
    return this.http.post<User>(
      baseUrl + "register/end/" + id,
      userDto,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    )
  }

  public editUser(id: string, userDto) {
    return this.http.put<User>(
      baseUrl + id,
      userDto,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    )
  }


}
