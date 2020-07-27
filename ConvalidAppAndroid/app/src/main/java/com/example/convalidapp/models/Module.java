package com.example.convalidapp.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Module {

    @SerializedName("horario")
    @Expose
    private List<Horario> horario = null;
    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("acronym")
    @Expose
    private String acronym;
    @SerializedName("teacher")
    @Expose
    private UserDetailResponse teacher;
}
