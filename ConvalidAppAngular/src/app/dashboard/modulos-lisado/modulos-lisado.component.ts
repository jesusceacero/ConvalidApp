import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { ModulosService } from 'src/app/services/modulos.service';
import { ModulosBorrarDialogComponent } from '../modulos-borrar-dialog/modulos-borrar-dialog.component';
import { ModuloDTO } from 'src/app/model/modulo.dto';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModulosAddDialogComponent } from '../modulos-add-dialog/modulos-add-dialog.component';
import { ModulosEditDialogComponent } from '../modulos-edit-dialog/modulos-edit-dialog.component';
import { Modulo } from 'src/app/model/modulo-respose.interface';

@Component({
  selector: 'app-modulos-lisado',
  templateUrl: './modulos-lisado.component.html',
  styleUrls: ['./modulos-lisado.component.scss']
})
export class ModulosLisadoComponent implements OnInit {

  dataSource: MatTableDataSource<Modulo>;
  listadoModulos: Modulo[];
  displayedColumns: string[] = ['nombre', 'acronimo','profesor','acciones'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public dialog : MatDialog,
    private modulosService: ModulosService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.loadModulos();
  }

  loadModulos(){
    this.modulosService.getModulos().subscribe(resp => {
      console.log(resp);
      this.listadoModulos = resp;
      this.cargarTabla();
      
    });
  }

  cargarTabla(){
    this.dataSource = new MatTableDataSource<Modulo>(this.listadoModulos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor =(item, property) =>{
        switch(property){
          case 'nombre' : return item.name;
          case 'acronimo' : return item.acronym;
          case 'profesor' : return item.teacher.fullname;
        }
      };
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (modulo, filter) => {
        const dataStr = modulo.name.toLowerCase() + " " + modulo.acronym.toLowerCase() + " " + modulo.teacher.fullname.toLowerCase();
        return dataStr.indexOf(filter) != -1;
      };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dialogoDeleteModulos(idModulo : string){
    let dialogRef = this.dialog.open(ModulosBorrarDialogComponent, {
      width: '300px',
      data: {idModulo : idModulo}
    });
  }

  dialogoAddModulo(){
    let dialogRef = this.dialog.open(ModulosAddDialogComponent, {
      width: '300px'
    });
  }

  dialogoEditHorario(idmodulo : string, moduloToEdit: ModuloDTO){
    let dialogRef = this.dialog.open(ModulosEditDialogComponent, {
      width: '300px',
      data: {idmodulo : idmodulo, modulo: moduloToEdit}
    });
  }
}
