package com.example.convalidapp.data.repository;

import android.util.Log;
import android.widget.Toast;

import com.example.convalidapp.R;
import com.example.convalidapp.commons.MyApp;
import com.example.convalidapp.models.HistorialDto;
import com.example.convalidapp.models.HistorialResponse;
import com.example.convalidapp.retrofit.ConvalidAppService;
import com.example.convalidapp.retrofit.ConvalidAppServiceGenerator;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HistorialRepository {

    ConvalidAppService service;

    public HistorialRepository(){
        service = ConvalidAppServiceGenerator.createService(ConvalidAppService.class);
    }

    public void addHistorial(HistorialDto historialDto){
        Call<HistorialResponse> call = service.addHistorial(historialDto);
        call.enqueue(new Callback<HistorialResponse>() {
            @Override
            public void onResponse(Call<HistorialResponse> call, Response<HistorialResponse> response) {
                if(response.isSuccessful()){
                    Toast.makeText(MyApp.getContext(), R.string.mensajeHistorialRegistrado, Toast.LENGTH_SHORT).show();
                }else {
                    Log.e("historial","Error al recivir el historial creado");
                }
            }

            @Override
            public void onFailure(Call<HistorialResponse> call, Throwable t) {
                Log.e("historial","Error al realizar la petición de registro de historial");
            }
        });
    }
}
