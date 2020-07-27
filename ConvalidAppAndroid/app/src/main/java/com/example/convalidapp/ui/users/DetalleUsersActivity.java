package com.example.convalidapp.ui.users;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.example.convalidapp.R;
import com.example.convalidapp.data.viewmodel.UserViewModel;

public class DetalleUsersActivity extends AppCompatActivity {

    UserViewModel userViewModel;
    String id;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detalle_users);
        id = getIntent().getExtras().getString("id");
        userViewModel = new ViewModelProvider(this).get(UserViewModel.class);
        Log.i("entra en el activity", ""+id);
        userViewModel.setIdAlumno(id);
    }
}
