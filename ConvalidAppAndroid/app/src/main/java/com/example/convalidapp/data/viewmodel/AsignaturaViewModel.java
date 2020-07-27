package com.example.convalidapp.data.viewmodel;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.MutableLiveData;

import com.example.convalidapp.data.repository.AsignaturaRepository;
import com.example.convalidapp.models.AsignaturaDetailResponse;

public class AsignaturaViewModel extends AndroidViewModel {
    AsignaturaRepository asignaturaRepository;
    MutableLiveData<AsignaturaDetailResponse> asignaturaDetail;

    public AsignaturaViewModel(@NonNull Application application) {
        super(application);
        asignaturaRepository = new AsignaturaRepository();
    }

    public MutableLiveData<AsignaturaDetailResponse> getAsignaturaDetail(String id) {
        asignaturaDetail = asignaturaRepository.getAsignatura(id);
        return asignaturaDetail;
    }
}
