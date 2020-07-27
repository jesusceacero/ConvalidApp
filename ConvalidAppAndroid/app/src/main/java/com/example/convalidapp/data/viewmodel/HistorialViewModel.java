package com.example.convalidapp.data.viewmodel;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;

import com.example.convalidapp.data.repository.HistorialRepository;
import com.example.convalidapp.models.HistorialDto;

public class HistorialViewModel extends AndroidViewModel {

    HistorialRepository historialRepository;

    public HistorialViewModel(@NonNull Application application) {
        super(application);
        historialRepository = new HistorialRepository();
    }

    public void addHistorial(HistorialDto historialDto){
        historialRepository.addHistorial(historialDto);
    }
}
