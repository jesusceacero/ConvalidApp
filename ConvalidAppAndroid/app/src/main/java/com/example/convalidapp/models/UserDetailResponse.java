package com.example.convalidapp.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailResponse {

    @SerializedName("role")
    @Expose
    private String role;
    @SerializedName("permissions")
    @Expose
    private Boolean permissions;
    @SerializedName("convalidados")
    @Expose
    private List<String> convalidados = null;
    @SerializedName("extras")
    @Expose
    private List<String> extras = null;
    @SerializedName("imparte")
    @Expose
    private List<String> imparte = null;
    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("fullname")
    @Expose
    private String fullname;
    @SerializedName("email")
    @Expose
    private String email;
    @SerializedName("password")
    @Expose
    private String password;
    @SerializedName("birthdate")
    @Expose
    private String birthdate;
    @SerializedName("photo")
    @Expose
    private Photo photo;
    @SerializedName("course")
    @Expose
    private String course;

    public List<String> palabrasClave = new ArrayList<>();
}
