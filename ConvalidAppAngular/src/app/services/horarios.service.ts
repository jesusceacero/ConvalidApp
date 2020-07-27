import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Schedule } from '../model/schedule-response.interfce';
import { ScheduleDto } from '../model/schedule.dto';

const baseUrl = "https://convalid-app.herokuapp.com/schedules/";
const baseUrlDelete = "https://convalid-app.herokuapp.com/schedules/delete/";
const baseUrlAdd = "https://convalid-app.herokuapp.com/schedules/add";
const baseUrlEdit = "https://convalid-app.herokuapp.com/schedules/edit/";


@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  constructor(private http: HttpClient) { }

  public getHorarios(){
    return this.http.get<Schedule[]>(
      baseUrl,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  };

  public deleteHorario(id : string){
    return this.http.delete<Schedule>(
      baseUrlDelete + id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  };

  public addHorario(horarioDto : ScheduleDto){
    return this.http.post<Schedule>(
      baseUrlAdd,
      horarioDto,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  };

  public editHorario(id : string, horarioDto : ScheduleDto){
    return this.http.put<Schedule>(
      baseUrlEdit + id,
      horarioDto,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  };

  public getHorarioID(id: string){
    return this.http.get<Schedule>(
      baseUrl+id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  }

}
