package com.example.convalidapp.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HorarioDTO {

    String id;
    String nombreCurso;
    String nombrePRofesor;
    String acronimo;
    String hora;
    String iduser;
    String idHorario;
}
