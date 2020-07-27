package com.example.convalidapp.data.viewmodel;

import android.app.Application;
import android.graphics.Bitmap;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.MutableLiveData;

import com.example.convalidapp.data.repository.UserRepository;
import com.example.convalidapp.models.UpdatePasswordDto;
import com.example.convalidapp.models.User;
import com.example.convalidapp.models.UserDetailResponse;
import com.example.convalidapp.models.UserFullname;

import java.util.List;

import okhttp3.MultipartBody;
import okhttp3.ResponseBody;

public class UserViewModel extends AndroidViewModel {
    UserRepository userRepository;
    MutableLiveData<UserDetailResponse> userDetail;
    MutableLiveData<List<UserDetailResponse>> usuarios;
    MutableLiveData<String> idAlumno = new MutableLiveData<>();
    MutableLiveData<User> uptPassword;
    MutableLiveData<List<UserFullname>> usuariosConvalidadosProf;
    MutableLiveData<ResponseBody> bitmapImg;

    public UserViewModel(@NonNull Application application) {
        super(application);
        userRepository = new UserRepository();
    }

    public MutableLiveData<UserDetailResponse> getUserDetail(String id) {
        userDetail = userRepository.getUser(id);
        return userDetail;
    }

    public MutableLiveData<List<UserDetailResponse>> getUsuarios(){
        usuarios = userRepository.getUsuarios();
        return usuarios;
    }

    public void setIdAlumno(String id){
        idAlumno.postValue(id);
    }

    public MutableLiveData<String> getIdAlumno() {
        return idAlumno;
    }

    public MutableLiveData<User> updatePassword(String id, UpdatePasswordDto updatePasswordDto){
        uptPassword = userRepository.updatePassword(id, updatePasswordDto);
        return uptPassword;
    }

    public MutableLiveData<List<UserFullname>> getUsersConvalidadosProf(String id){
        usuariosConvalidadosProf = userRepository.getUsersConvalidadosProf(id);
        return usuariosConvalidadosProf;
    }

    public MutableLiveData<ResponseBody> getImagen(String id) {
        bitmapImg = userRepository.getImagenEquipo(id);
        return bitmapImg;
    }

    public void updatePhoto(String id, MultipartBody.Part photo) {
        userRepository.updatePhoto(id, photo);
    }

    public void deletePhoto(String id) {
        userRepository.deletePhoto(id);
    }
}
