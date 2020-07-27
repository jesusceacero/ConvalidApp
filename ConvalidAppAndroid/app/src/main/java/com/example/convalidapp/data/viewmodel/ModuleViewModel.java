package com.example.convalidapp.data.viewmodel;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.MutableLiveData;

import com.example.convalidapp.data.repository.ModuleRepository;
import com.example.convalidapp.models.ListModulosDTO;
import com.example.convalidapp.models.Module;

import java.util.List;

public class ModuleViewModel extends AndroidViewModel{

    private ModuleRepository moduleRepository;
    private MutableLiveData<Module> modulo;
    private MutableLiveData<List<Module>> modulos;

    public ModuleViewModel(@NonNull Application application) {
        super(application);
        moduleRepository = new ModuleRepository();
    }

    public MutableLiveData<Module> getModule(String id){
        modulo = moduleRepository.getModule(id);
        return modulo;
    }

    public MutableLiveData<List<Module>> getModulosID(ListModulosDTO ids){
        modulos = moduleRepository.getModulesID(ids);
        return modulos;
    }
}
