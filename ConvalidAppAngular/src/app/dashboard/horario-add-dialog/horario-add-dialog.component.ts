import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { HorariosService } from '../../services/horarios.service';
import { ScheduleDto } from '../../model/schedule.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-horario-add-dialog',
  templateUrl: './horario-add-dialog.component.html',
  styleUrls: ['./horario-add-dialog.component.scss']
})
export class HorarioAddDialogComponent implements OnInit {

  public form: FormGroup;
  horarioDto: ScheduleDto;

  constructor(
    public dialogRef: MatDialogRef<HorarioAddDialogComponent>,
    private horarioService : HorariosService,
    private snackBar : MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.horarioDto = new ScheduleDto();
    this.form = this.fb.group({
      dia: [null, Validators.compose([Validators.required])],
      hora: [null, Validators.compose([Validators.required])]
    });
  }

  addHorario() {
    //const horarioDto = <ScheduleDto>this.form.value;
    this.horarioDto.dia = this.form.value.dia;
    this.horarioDto.hora = this.form.value.hora;
    this.horarioService.addHorario(this.horarioDto).subscribe(resp => {
      this.snackBar.open("Horario añadido correctamente.")
      this.dialogRef.close();
      location.reload();
    });
  }

  cerrarDialog() {
    this.dialogRef.close();
  }
}