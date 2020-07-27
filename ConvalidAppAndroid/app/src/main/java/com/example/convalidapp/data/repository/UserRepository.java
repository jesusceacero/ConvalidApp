package com.example.convalidapp.data.repository;

import android.util.Log;
import android.widget.Toast;

import androidx.lifecycle.MutableLiveData;

import com.example.convalidapp.R;
import com.example.convalidapp.commons.MyApp;
import com.example.convalidapp.models.UpdatePasswordDto;
import com.example.convalidapp.models.User;
import com.example.convalidapp.models.UserDetailResponse;
import com.example.convalidapp.models.UserFullname;
import com.example.convalidapp.retrofit.ConvalidAppService;
import com.example.convalidapp.retrofit.ConvalidAppServiceGenerator;

import java.util.List;

import okhttp3.MultipartBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserRepository {
    ConvalidAppService service;
    ConvalidAppServiceGenerator serviceGenerator;

    public UserRepository() {
        service = serviceGenerator.createService(ConvalidAppService.class);
    }

    public MutableLiveData<UserDetailResponse> getUser(String id) {
        final MutableLiveData<UserDetailResponse> userDetail = new MutableLiveData<>();

        Call<UserDetailResponse> getUserDetail = service.getUser(id);
        getUserDetail.enqueue(new Callback<UserDetailResponse>() {
            @Override
            public void onResponse(Call<UserDetailResponse> call, Response<UserDetailResponse> response) {
                if(response.isSuccessful()){
                    Log.i("usuario",""+response.body());
                    userDetail.setValue(response.body());
                }
            }
            @Override
            public void onFailure(Call<UserDetailResponse> call, Throwable t) {
                Log.i("usuario",""+t.getMessage());
                Toast.makeText(MyApp.getContext(), "Error in the connection este es", Toast.LENGTH_SHORT).show();
            }
        });
        return userDetail;
    }

    public MutableLiveData<List<UserDetailResponse>> getUsuarios(){
        final MutableLiveData<List<UserDetailResponse>> data = new MutableLiveData<>();
        Call<List<UserDetailResponse>> call = service.getUsuarios();
        call.enqueue(new Callback<List<UserDetailResponse>>() {
            @Override
            public void onResponse(Call<List<UserDetailResponse>> call, Response<List<UserDetailResponse>> response) {
                if(response.isSuccessful()){
                    data.setValue(response.body());
                }else{
                    Log.e("Usuario","Error al recivir la lista de usuarios");
                }
            }

            @Override
            public void onFailure(Call<List<UserDetailResponse>> call, Throwable t) {
                Log.e("Usuario","Error al realizar la petición de usuarios");
            }
        });
        return data;
    }

    public MutableLiveData<User> updatePassword(String id, UpdatePasswordDto updatePasswordDto) {
        final MutableLiveData<User> uptPass = new MutableLiveData<>();

        Call<User> getUserDetail = service.updatePasswordUser(id, updatePasswordDto);
        getUserDetail.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if(response.isSuccessful()){
                    Log.i("usuario info",""+response.body());
                    uptPass.setValue(response.body());
                }
            }
            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.e("usuario",""+t.getMessage());
                Toast.makeText(MyApp.getContext(), "Error in the connection", Toast.LENGTH_SHORT).show();
            }
        });
        return uptPass;
    }

    public MutableLiveData<List<UserFullname>> getUsersConvalidadosProf(String id){
        final MutableLiveData<List<UserFullname>> data = new MutableLiveData<>();
        Call<List<UserFullname>> call = service.getUsersConvalidadosProf(id);
        call.enqueue(new Callback<List<UserFullname>>() {
            @Override
            public void onResponse(Call<List<UserFullname>> call, Response<List<UserFullname>> response) {
                if(response.isSuccessful()){
                    data.setValue(response.body());
                }else{
                    Log.e("Usuario","Error al recibir la lista de usuarios");
                }
            }

            @Override
            public void onFailure(Call<List<UserFullname>> call, Throwable t) {
                Log.e("Usuario","Error al realizar la petición");
            }
        });
        return data;
    }

    public MutableLiveData<ResponseBody> getImagenEquipo(String id) {
        final MutableLiveData<ResponseBody> imagenBitMap = new MutableLiveData<>();
        Call<ResponseBody> imagenUser = service.getImagen(id);
        imagenUser.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if(response.isSuccessful()){
                    imagenBitMap.setValue(response.body());
                }
            }
            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error in the connection", Toast.LENGTH_SHORT).show();
            }
        });
        return imagenBitMap;
    }

    public void updatePhoto(String id, MultipartBody.Part photo){
        Call<UserFullname> call = service.updatePhoto(id, photo);
        call.enqueue(new Callback<UserFullname>() {
            @Override
            public void onResponse(Call<UserFullname> call, Response<UserFullname> response) {
                if (response.isSuccessful()){
                    Log.i("uptade","Foto actualizada correctamente");
                }else{
                    Log.e("update","Error al recibir el usuario cuando se cambia la foto");
                }
            }

            @Override
            public void onFailure(Call<UserFullname> call, Throwable t) {
                Log.e("update","Error al realizar la peticion de actualización de foto");
                Toast.makeText(MyApp.getContext(), MyApp.getContext().getResources().getString(R.string.error_in_the_connection), Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void deletePhoto(String id) {
        Call<ResponseBody> call = service.deletePhoto(id);
        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if(response.isSuccessful()){
                    Log.i("deletePhoto","Foto borrada correctamente");
                }else{
                    Log.e("deletePhoto","Error al recibir el usuario sn foto");
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Log.e("deletePhoto","Error al realizar la petición de borrado de foto");
                Toast.makeText(MyApp.getContext(), MyApp.getContext().getResources().getString(R.string.error_in_the_connection), Toast.LENGTH_SHORT).show();
            }
        });
    }
}
