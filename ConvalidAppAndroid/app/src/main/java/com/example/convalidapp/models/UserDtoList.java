package com.example.convalidapp.models;


import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoList {

    private String id;
    private String name;
    private String acronimo;
    private String email;
    private Photo foto;

    public List<String> palabrasClave = new ArrayList<>();

}
