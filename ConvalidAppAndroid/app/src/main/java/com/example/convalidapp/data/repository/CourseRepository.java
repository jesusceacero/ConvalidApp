package com.example.convalidapp.data.repository;

import android.util.Log;

import androidx.lifecycle.MutableLiveData;

import com.example.convalidapp.models.Course;
import com.example.convalidapp.retrofit.ConvalidAppService;
import com.example.convalidapp.retrofit.ConvalidAppServiceGenerator;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CourseRepository {

    ConvalidAppService service;
    MutableLiveData<Course> course;

    public CourseRepository(){
        service = ConvalidAppServiceGenerator.createService(ConvalidAppService.class);
    }

    public MutableLiveData<Course> getCourse(String id){
        final MutableLiveData<Course> data = new MutableLiveData<>();

        Call<Course> call = service.getCourse(id);
        call.enqueue(new Callback<Course>() {
            @Override
            public void onResponse(Call<Course> call, Response<Course> response) {
                if (response.isSuccessful()){
                    data.setValue(response.body());
                }else{
                    Log.e("Curso","Error al devolver el curso");
                }
            }

            @Override
            public void onFailure(Call<Course> call, Throwable t) {
                Log.e("Curso","Error al realizar la petición");
            }
        });

        return data;
    }


}
