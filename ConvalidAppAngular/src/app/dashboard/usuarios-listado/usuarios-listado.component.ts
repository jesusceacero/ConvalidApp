import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from 'src/app/model/user.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioBorrarDialogComponent } from '../usuario-borrar-dialog/usuario-borrar-dialog.component';
import { UsuariosAddDialogComponent } from '../usuarios-add-dialog/usuarios-add-dialog.component';
import { CursosService } from 'src/app/services/cursos.service';
import { UserDto } from 'src/app/model/user.dto';
import { UsuariosEditDialogComponent } from '../usuarios-edit-dialog/usuarios-edit-dialog.component';

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './usuarios-listado.component.html',
  styleUrls: ['./usuarios-listado.component.scss']
})
export class UsuariosListadoComponent implements OnInit {

  dataSource: MatTableDataSource<User>;
  listadoUsuarios: User[];
  displayedColumns: string[] = ['nombre', 'email', 'curso','acciones'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public dialog : MatDialog,
    private snackBar : MatSnackBar,
    private userService: UsuariosService,
    private courseService: CursosService) { }

  ngOnInit() {
    this.loadUsuarios();
  }

  public loadUsuarios() {
    this .userService.getUsers().subscribe(resp =>{
      console.log(resp);
      this.listadoUsuarios = resp;
      for (let index = 0; index < this.listadoUsuarios.length; index++) {
        const element = this.listadoUsuarios[index];
        this.courseService.getCursoID(element.course).subscribe(resp2 =>{
          element.course = resp2.acronym
          if(resp[resp.length-1].id === element.id){
            this.cargarTabla();
          }
        })

        
      }
      
    });
  }

  cargarTabla(){
    this.dataSource = new MatTableDataSource<User>(this.listadoUsuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor =(item, property) =>{
        switch(property){
          case 'nombre' : return item.fullname;
          case 'email' : return item.email;
        }
      };
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (usuario, filter) => {
        const dataStr = usuario.fullname.toLowerCase() + " " + usuario.email.toLowerCase();
        return dataStr.indexOf(filter) != -1;
      }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dialogoDeleteUsuario(idUsuario : string){
    console.log(idUsuario);
    let dialogRef = this.dialog.open(UsuarioBorrarDialogComponent, {
      width: '300px',
      data: {idUsuario : idUsuario}
    });
  }

  dialogoAddUsuario(){
    let dialogRef = this.dialog.open(UsuariosAddDialogComponent, {
      width: '300px',
    });
  }

  dialogoEditUsuario(id : string){
    console.log(id);
    let dialogRef = this.dialog.open(UsuariosEditDialogComponent, {
      width: '300px',
      data: {id : id}
    });
  }

}
