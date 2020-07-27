import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Modulo } from '../model/modulo-respose.interface';
import { User } from '../model/user.interface';
import { ModuloCrudDTO } from '../model/module-crud.dto';
import { ModuloListDTO } from '../model/moduleList.dto';

const baseUrl = "https://convalid-app.herokuapp.com/modules/";
const baseUrlDelete = "https://convalid-app.herokuapp.com/modules/delete/";
const baseUrlAdd = "https://convalid-app.herokuapp.com/modules/add";
const baseUrlEdit = "https://convalid-app.herokuapp.com/modules/edit/";
const baseUrlProfesores = "https://convalid-app.herokuapp.com/users/profesor";



@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  constructor(private http: HttpClient) { }

  public getModulos(){
    return this.http.get<Modulo[]>(
      baseUrl,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  };

  public deleteModulo(id: string){
    return this.http.delete<Modulo>(
      baseUrlDelete + id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    )
  }

  public getModuloID(id: string){
    return this.http.get<Modulo>(
      baseUrl+id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  }

  public addModulo(moduloDto : ModuloCrudDTO){
    return this.http.post<Modulo>(
      baseUrlAdd,
      moduloDto,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  };

  public editModulo(id : string, moduloDto : ModuloCrudDTO){
    return this.http.put<Modulo>(
      baseUrlEdit + id,
      moduloDto,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  };

  public getModulosArray(ids : ModuloListDTO){
    return this.http.post<Modulo[]>(
      baseUrl+"list",
      ids,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  };

  public getUsersProfesores(){
    return this.http.get<User[]>(
      baseUrlProfesores,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  };

}
