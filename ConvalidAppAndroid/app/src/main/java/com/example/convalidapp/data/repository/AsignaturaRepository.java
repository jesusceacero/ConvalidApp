package com.example.convalidapp.data.repository;

import android.widget.Toast;

import androidx.lifecycle.MutableLiveData;

import com.example.convalidapp.commons.MyApp;
import com.example.convalidapp.models.AsignaturaDetailResponse;
import com.example.convalidapp.retrofit.ConvalidAppService;
import com.example.convalidapp.retrofit.ConvalidAppServiceGenerator;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AsignaturaRepository {
    ConvalidAppService service;
    ConvalidAppServiceGenerator serviceGenerator;

    public AsignaturaRepository() {
        service = serviceGenerator.createService(ConvalidAppService.class);
    }

    public MutableLiveData<AsignaturaDetailResponse> getAsignatura(String id) {
        final MutableLiveData<AsignaturaDetailResponse> asignaturaDetail = new MutableLiveData<>();

        Call<AsignaturaDetailResponse> getAsignaturaDetail = service.getAsignatura(id);
        getAsignaturaDetail.enqueue(new Callback<AsignaturaDetailResponse>() {
            @Override
            public void onResponse(Call<AsignaturaDetailResponse> call, Response<AsignaturaDetailResponse> response) {
                if(response.isSuccessful()){
                    asignaturaDetail.setValue(response.body());
                }
            }
            @Override
            public void onFailure(Call<AsignaturaDetailResponse> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error in the connection", Toast.LENGTH_SHORT).show();
            }
        });
        return asignaturaDetail;
    }
}
