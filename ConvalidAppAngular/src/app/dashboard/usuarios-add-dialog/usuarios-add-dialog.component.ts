import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-add-dialog',
  templateUrl: './usuarios-add-dialog.component.html',
  styleUrls: ['./usuarios-add-dialog.component.scss']
})
export class UsuariosAddDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UsuariosAddDialogComponent>,
    private router: Router
  ) { }

  ngOnInit() {
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

  addconserje(){
    this.router.navigate(['admin/users/register/conserje']);
    this.dialogRef.close();
  }

  addProfesor(){
    this.router.navigate(['admin/users/register/profesor']);
    this.dialogRef.close();
  }

  addAlumno(){
    this.router.navigate(['admin/users/register/alumno']);
    this.dialogRef.close();
  }

}
