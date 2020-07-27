package com.example.convalidapp.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Photo {

    @SerializedName("data")
    @Expose
    public String data;
    @SerializedName("contentType")
    @Expose
    public String contentType;
}
