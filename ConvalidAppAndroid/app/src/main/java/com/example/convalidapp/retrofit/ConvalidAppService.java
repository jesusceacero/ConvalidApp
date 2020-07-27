package com.example.convalidapp.retrofit;

import com.example.convalidapp.models.AsignaturaDetailResponse;
import com.example.convalidapp.models.AuthLogin;
import com.example.convalidapp.models.Course;
import com.example.convalidapp.models.HistorialDto;
import com.example.convalidapp.models.HistorialResponse;
import com.example.convalidapp.models.ListModulosDTO;
import com.example.convalidapp.models.LoginDTO;
import com.example.convalidapp.models.Module;
import com.example.convalidapp.models.UpdatePasswordDto;
import com.example.convalidapp.models.User;
import com.example.convalidapp.models.UserDetailResponse;
import com.example.convalidapp.models.UserFullname;

import java.util.List;

import okhttp3.MultipartBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Part;
import retrofit2.http.Path;

public interface ConvalidAppService {

    @POST("/users/login")
    Call<AuthLogin> login(@Body LoginDTO user);

    @GET("/users/{id}")
    Call<UserDetailResponse> getUser(@Path("id") String id);

    @GET("/modules/{id}")
    Call<AsignaturaDetailResponse> getAsignatura(@Path("id") String id);

    @GET("/courses/{id}")
    Call<Course> getCourse(@Path("id") String id);

    @GET("/modules/{id}")
    Call<Module> getModule(@Path("id") String id);

    @POST("/modules/list")
    Call<List<Module>> getModulesID(@Body ListModulosDTO modules);

    @GET("/users/users")
    Call<List<UserDetailResponse>> getUsuarios();

    @POST("/historial/add")
    Call<HistorialResponse> addHistorial(@Body HistorialDto historialDto);

    @PUT("/users/{id}/password")
    Call<User> updatePasswordUser(@Path("id") String id, @Body UpdatePasswordDto updatePasswordDto);

    @GET("/users/{id}/profesor")
    Call<List<UserFullname>> getUsersConvalidadosProf(@Path("id") String id);

    @GET("/users/{id}/img")
    Call<ResponseBody> getImagen(@Path("id") String id);

    @Multipart
    @PUT("/users/{id}/img")
    Call<UserFullname> updatePhoto(@Path("id")String id,
                                    @Part MultipartBody.Part photo);

    @DELETE("/users/{id}/img")
    Call<ResponseBody> deletePhoto(@Path("id") String id);
}
