package com.example.convalidapp.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("email")
    @Expose
    private String email;
    @SerializedName("role")
    @Expose
    private String role;
    @SerializedName("birthdate")
    @Expose
    private String birthdate;
    @SerializedName("permissions")
    @Expose
    private Boolean permissinons;
    @SerializedName("photo")
    @Expose
    private Photo photo;
    @SerializedName("validated")
    @Expose
    private Boolean validated;
}
