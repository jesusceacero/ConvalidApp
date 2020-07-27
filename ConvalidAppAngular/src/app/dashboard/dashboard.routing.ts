import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UsuariosListadoComponent } from './usuarios-listado/usuarios-listado.component';
import { HorariosListadoComponent } from './horarios-listado/horarios-listado.component';
import { CursosListadoComponent } from './cursos-listado/cursos-listado.component';
import { ModulosLisadoComponent } from './modulos-lisado/modulos-lisado.component';
import { HistorialListadoComponent } from './historial-listado/historial-listado.component';
import { Component } from '@angular/core';
import { UsuariosAddConserjeComponent } from './usuarios-add-conserje/usuarios-add-conserje.component';
import { UsuariosAddProfesorComponent } from './usuarios-add-profesor/usuarios-add-profesor.component';
import { UsuariosAddAlumnoComponent } from './usuarios-add-alumno/usuarios-add-alumno.component';

export const DashboardRoutes: Routes = [
  {
    path: 'users',
    component: UsuariosListadoComponent
  },
  {
    path: 'schedules',
    component: HorariosListadoComponent
  },
  {
    path: 'courses',
    component: CursosListadoComponent
  },
  {
    path: 'modules',
    component: ModulosLisadoComponent
  },
  {
    path: 'historial',
    component: HistorialListadoComponent
  },
  {
    path: 'users/register/conserje',
    component: UsuariosAddConserjeComponent
  },
  {
    path: 'users/register/profesor',
    component: UsuariosAddProfesorComponent
  },
  {
    path: 'users/register/alumno',
    component: UsuariosAddAlumnoComponent
  }
];
