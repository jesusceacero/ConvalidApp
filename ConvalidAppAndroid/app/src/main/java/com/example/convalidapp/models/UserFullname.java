package com.example.convalidapp.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFullname {
    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("fullname")
    @Expose
    private String fullname;
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
