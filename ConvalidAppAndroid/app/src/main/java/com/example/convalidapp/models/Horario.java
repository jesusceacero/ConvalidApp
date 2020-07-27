package com.example.convalidapp.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Horario {

    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("dia")
    @Expose
    private String dia;
    @SerializedName("hora")
    @Expose
    private String hora;
}
