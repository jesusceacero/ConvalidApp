package com.example.convalidapp.data.repository;



import android.util.Log;

import androidx.lifecycle.MutableLiveData;

import com.example.convalidapp.models.ListModulosDTO;
import com.example.convalidapp.models.Module;
import com.example.convalidapp.retrofit.ConvalidAppService;
import com.example.convalidapp.retrofit.ConvalidAppServiceGenerator;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ModuleRepository {

    ConvalidAppService service;
    MutableLiveData<Module> module;
    MutableLiveData<List<Module>> modules;

    public ModuleRepository(){
        service = ConvalidAppServiceGenerator.createService(ConvalidAppService.class);
    }

    public MutableLiveData<Module> getModule(String id){
        final MutableLiveData<Module> data = new MutableLiveData<>();

        Call<Module> call = service.getModule(id);
        call.enqueue(new Callback<Module>() {
            @Override
            public void onResponse(Call<Module> call, Response<Module> response) {
                if(response.isSuccessful()){
                    data.setValue(response.body());
                }else {
                    Log.e("Modulo","Error al devolver el modulo");
                }
            }

            @Override
            public void onFailure(Call<Module> call, Throwable t) {
                Log.e("Modulo","Error al realizar la petición");
            }
        });
        return data;
    }

    public MutableLiveData<List<Module>> getModulesID(ListModulosDTO ids){
        final MutableLiveData<List<Module>> data = new MutableLiveData<>();
        Call<List<Module>> call = service.getModulesID(ids);
        call.enqueue(new Callback<List<Module>>() {
            @Override
            public void onResponse(Call<List<Module>> call, Response<List<Module>> response) {
                if(response.isSuccessful()){
                    data.setValue(response.body());
                }else{
                    Log.e("Modulo","Error al devolver el listado de modulos");
                }
            }

            @Override
            public void onFailure(Call<List<Module>> call, Throwable t) {
                Log.e("Modulo","Error al realizar la petición de listado de modulos");
            }
        });
        modules = data;
        return data;
    }
}
