import { Injectable } from '@angular/core';
import { Historial } from '../model/historial-response.interface';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const baseUrl = "https://convalid-app.herokuapp.com/historial/";
const baseUrlDelete = "https://convalid-app.herokuapp.com/historial/delete/";


@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(private http: HttpClient) { }

  public getHitorial(){
    return this.http.get<Historial[]>(
      baseUrl,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  };

  public deleteHistoria(id : string){
    return this.http.delete<Historial>(
      baseUrlDelete + id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  };

}
