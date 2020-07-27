package com.example.convalidapp.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthLogin {
    @SerializedName("token")
    @Expose
    public String token;
    @SerializedName("usuario")
    @Expose
    public User user;
}
