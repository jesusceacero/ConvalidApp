package com.example.convalidapp.ui.auth;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.convalidapp.MainActivity;
import com.example.convalidapp.MainConserjeActivity;
import com.example.convalidapp.MainProfesorActivity;
import com.example.convalidapp.R;
import com.example.convalidapp.commons.Constants;
import com.example.convalidapp.commons.SharedPreferencesManager;
import com.example.convalidapp.models.AuthLogin;
import com.example.convalidapp.models.LoginDTO;
import com.example.convalidapp.retrofit.ConvalidAppService;
import com.example.convalidapp.retrofit.LoginServiceGenerator;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    private ImageView logo;
    private EditText email, password;
    private Button login;
    private ConvalidAppService convalidAppService;
    private TextView corporativo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        convalidAppService = LoginServiceGenerator.createService(ConvalidAppService.class);

        logo = findViewById(R.id.imageViewLogo);
        email = findViewById(R.id.editTextEmail);
        password = findViewById(R.id.editTextPassword);
        login = findViewById(R.id.buttonLogin);
        corporativo = findViewById(R.id.textViewCorpora);

        Glide.with(this)
                .load(R.drawable.logoconvalidapp)
                .centerCrop()
                .into(logo);

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                login(email.getText().toString(),password.getText().toString());
            }
        });
    }

    public void login(String email,String password){
        LoginDTO user = new LoginDTO(email,password);

        if(email.contains("@triana.salesianos.edu")){
            Call<AuthLogin> call = convalidAppService.login(user);
            call.enqueue(new Callback<AuthLogin>() {
                @Override
                public void onResponse(Call<AuthLogin> call, Response<AuthLogin> response) {
                    if(response.isSuccessful()){
                        Log.i("respuesta",""+response.body());
                        SharedPreferencesManager.setStringValue(Constants.SHARED_PREFERENCES_AUTH_TOKEN, response.body().getToken());
                        SharedPreferencesManager.setStringValue(Constants.SHARED_PREFERENCES_ID, response.body().getUser().getId());
                        if (response.body().getUser().getRole().equals("USER")){
                            Intent i =  new Intent(LoginActivity.this, MainActivity.class);
                            startActivity(i);
                            finish();
                        }
                        if(response.body().getUser().getRole().equals("CONSERJE")){
                            Intent i =  new Intent(LoginActivity.this, MainConserjeActivity.class);
                            startActivity(i);
                            finish();
                        }
                        if(response.body().getUser().getRole().equals("PROFESOR") || response.body().getUser().getRole().equals("ADMIN")){
                            Intent i =  new Intent(LoginActivity.this, MainProfesorActivity.class);
                            startActivity(i);
                            finish();
                        }
                    }else {
                        Toast.makeText(LoginActivity.this, "El email o contraseña son incorrectos.", Toast.LENGTH_SHORT).show();
                        Log.i("user", "viene vacio");
                    }
                }

                @Override
                public void onFailure(Call<AuthLogin> call, Throwable t) {
                    Toast.makeText(LoginActivity.this, "El email o contraseña spn incorrectos.", Toast.LENGTH_SHORT).show();
                    Log.i("user", "peor");
                }
            });
        }else {
            corporativo.setVisibility(View.VISIBLE);
        }
    }
}
