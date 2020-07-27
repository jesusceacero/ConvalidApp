import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material';

import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { LoginService } from '../services/login.service';
import { UsuariosListadoComponent } from './usuarios-listado/usuarios-listado.component';
import { UsuarioBorrarDialogComponent } from './usuario-borrar-dialog/usuario-borrar-dialog.component';
import { HorariosListadoComponent } from './horarios-listado/horarios-listado.component';
import { HorarioBorrarDialogComponent } from './horario-borrar-dialog/horario-borrar-dialog.component';
import { CursosListadoComponent } from './cursos-listado/cursos-listado.component';
import { CursosBorrarDialogComponent } from './cursos-borrar-dialog/cursos-borrar-dialog.component';
import { ModulosLisadoComponent } from './modulos-lisado/modulos-lisado.component';
import { ModulosBorrarDialogComponent } from './modulos-borrar-dialog/modulos-borrar-dialog.component';
import { HistorialListadoComponent } from './historial-listado/historial-listado.component';
import { HistorialBorrarDialogComponent } from './historial-borrar-dialog/historial-borrar-dialog.component';
import { HorarioAddDialogComponent } from './horario-add-dialog/horario-add-dialog.component';
import { HorarioEditDialogComponent } from './horario-edit-dialog/horario-edit-dialog.component';
import { CursosEditDialogComponent } from './cursos-edit-dialog/cursos-edit-dialog.component';
import { CursosAddDialogComponent } from './cursos-add-dialog/cursos-add-dialog.component';
import { ModulosAddDialogComponent } from './modulos-add-dialog/modulos-add-dialog.component';
import { ModulosEditDialogComponent } from './modulos-edit-dialog/modulos-edit-dialog.component';
import { UsuariosAddDialogComponent } from './usuarios-add-dialog/usuarios-add-dialog.component';
import { UsuariosAddConserjeComponent } from './usuarios-add-conserje/usuarios-add-conserje.component';
import { UsuariosAddProfesorComponent } from './usuarios-add-profesor/usuarios-add-profesor.component';
import { UsuariosAddAlumnoComponent } from './usuarios-add-alumno/usuarios-add-alumno.component';
import { UsuariosEditDialogComponent } from './usuarios-edit-dialog/usuarios-edit-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    ChartsModule,
    NgxDatatableModule,
    FlexLayoutModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatSelectModule
  ],
  declarations: [
    DashboardComponent, 
    UsuariosListadoComponent, UsuarioBorrarDialogComponent, HorariosListadoComponent, HorarioBorrarDialogComponent, CursosListadoComponent, CursosBorrarDialogComponent, ModulosLisadoComponent, ModulosBorrarDialogComponent, HistorialListadoComponent, HistorialBorrarDialogComponent, HorarioAddDialogComponent, HorarioEditDialogComponent, CursosEditDialogComponent, CursosAddDialogComponent, ModulosAddDialogComponent, ModulosEditDialogComponent, UsuariosAddDialogComponent, UsuariosAddConserjeComponent, UsuariosAddProfesorComponent, UsuariosAddAlumnoComponent, UsuariosEditDialogComponent],
    entryComponents: [
      UsuarioBorrarDialogComponent,
      HorarioBorrarDialogComponent,
      CursosBorrarDialogComponent,
      ModulosBorrarDialogComponent,
      HistorialBorrarDialogComponent,
      HorarioAddDialogComponent,
      HorarioEditDialogComponent,
      CursosAddDialogComponent,
      CursosEditDialogComponent,
      ModulosAddDialogComponent,
      ModulosEditDialogComponent,
      UsuariosAddDialogComponent,
      UsuariosEditDialogComponent
    ],
  providers: [
    LoginService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}
  ],
})
export class DashboardModule {}
