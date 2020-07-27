package com.example.convalidapp.data.viewmodel;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.MutableLiveData;

import com.example.convalidapp.data.repository.CourseRepository;
import com.example.convalidapp.models.Course;

public class CourseViewModel extends AndroidViewModel {

    private CourseRepository courseRepository;
    private MutableLiveData<Course> curso;


    public CourseViewModel(@NonNull Application application) {
        super(application);
        courseRepository = new CourseRepository();
    }

    public MutableLiveData<Course> getCouerse(String id){
        curso = courseRepository.getCourse(id);
        return curso;
    }
}
