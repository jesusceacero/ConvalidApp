import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Course } from '../model/course-response.interface';
import { Observable } from 'rxjs';
import { CourseDto } from '../model/course.dto';

const baseUrl = "https://convalid-app.herokuapp.com/courses/";
const baseUrlDelete = "https://convalid-app.herokuapp.com/courses/delete/";
const baseUrlAdd = "https://convalid-app.herokuapp.com/courses/add";
const baseUrlEdit = "https://convalid-app.herokuapp.com/courses/edit/";


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }

  getCursos(){
    return this.http.get<Course[]>(
      baseUrl,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  };

  deleteCurso(id:string){
    return this.http.delete<Course>(
      baseUrlDelete + id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  };

  public addCurso(cursoDto : CourseDto){
    return this.http.post<Course>(
      baseUrlAdd,
      cursoDto,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  };

  public editCurso(id : string, cursoDto : CourseDto){
    return this.http.put<Course>(
      baseUrlEdit + id,
      cursoDto,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    );
  };

  public getCursoID(id: string){
    return this.http.get<Course>(
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
