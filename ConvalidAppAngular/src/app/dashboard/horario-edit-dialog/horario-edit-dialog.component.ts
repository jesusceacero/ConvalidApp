import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { HorariosService } from '../../services/horarios.service';
import { ScheduleDto } from '../../model/schedule.dto';

@Component({
  selector: 'app-horario-edit-dialog',
  templateUrl: './horario-edit-dialog.component.html',
  styleUrls: ['./horario-edit-dialog.component.scss']
})
export class HorarioEditDialogComponent implements OnInit {

  horarioToEdit : ScheduleDto;

  constructor(
    public dialogRef: MatDialogRef<HorarioEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private horarioService : HorariosService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.horarioToEdit = new ScheduleDto();
  }

  editHorario() {
    this.horarioService.editHorario(this.data.idhorario, this.horarioToEdit).subscribe(resp => {
      this.snackBar.open("Horario editado correctamente.");
      this.dialogRef.close();
      location.reload();
    });
    
  }

  cerrarDialog() {
    this.dialogRef.close();
  }
}
