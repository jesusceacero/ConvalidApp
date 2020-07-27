package com.example.convalidapp.ui.profile;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.convalidapp.R;
import com.example.convalidapp.commons.Constants;
import com.example.convalidapp.commons.MyApp;
import com.example.convalidapp.commons.SharedPreferencesManager;
import com.example.convalidapp.data.repository.UserRepository;
import com.example.convalidapp.data.viewmodel.ModuleViewModel;
import com.example.convalidapp.data.viewmodel.UserViewModel;
import com.example.convalidapp.models.ListModulosDTO;
import com.example.convalidapp.models.Module;
import com.example.convalidapp.models.UpdatePasswordDto;
import com.example.convalidapp.models.UserDetailResponse;
import com.example.convalidapp.ui.qr.GenerateQrActivity;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.mikhaellopez.circularimageview.CircularImageView;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link ProfileFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class ProfileFragment extends Fragment {

    private static final int READ_REQUEST_CODE = 42;
    private UserViewModel userViewModel;
    private ModuleViewModel moduleViewModel;
    private UserDetailResponse user;
    private TextView nombre, email, fechaNac, curso, tvNombreModuloExtra;
    private CircularImageView circularImageView;
    private FloatingActionButton fab2;
    private Uri uriS;
    private EditText passawor1,passswor2,emailPass,passwordActual;
    private Button savePass;
    private ImageView check, cancel;
    private View view;
    private CardView cvModulos;
    private List<String> listaAuxiliarExtra;
    private ImageView qr;
    private ListModulosDTO modulosDTO;

    public ProfileFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     * @return A new instance of fragment ProfileFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static ProfileFragment newInstance() {
        ProfileFragment fragment = new ProfileFragment();
        Bundle args = new Bundle();

        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_profile, container, false);
        findViews();

        circularImageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                performFileSearch();
            }
        });

        userViewModel.getUserDetail(SharedPreferencesManager.getStringValue(Constants.SHARED_PREFERENCES_ID)).observe(getActivity(), new Observer<UserDetailResponse>() {
            @Override
            public void onChanged(UserDetailResponse usuario) {
                user = usuario;
                if (user.getRole().equals("USER")) {
                    qr.setVisibility(view.VISIBLE);
                }
                nombre.setText(user.getFullname());
                email.setText(user.getEmail());
                fechaNac.setText(user.getBirthdate());
                //curso.setText(user.getCourse().getAcronym());

                if (user.getRole().equals("USER")) {
                    if (user.getExtras().isEmpty() || user.getExtras() == null) {
                        cvModulos.setVisibility(view.GONE);
                    } else {
                        cvModulos.setVisibility(view.VISIBLE);
                        modulosDTO.setModules(user.getExtras());
                        moduleViewModel.getModulosID(modulosDTO).observe(getActivity(), new Observer<List<Module>>() {
                            @Override
                            public void onChanged(List<Module> modules) {
                                for (int i=0; i < modules.size(); i++) {
                                    listaAuxiliarExtra.add(modules.get(i).getAcronym()+" - "+modules.get(i).getName()+"\n");
                                }
                                tvNombreModuloExtra.setText(listaAuxiliarExtra.toString());
                            }
                        });

                    }
                } else {
                    cvModulos.setVisibility(view.GONE);
                }

                if (user.getPhoto() == null){
                    Glide
                            .with(getActivity())
                            .load(R.drawable.ic_user)
                            .thumbnail(Glide.with(ProfileFragment.this).load(R.drawable.loading_gif))
                            .centerCrop()
                            .into(circularImageView);
                }


                if (user.getPhoto() != null) {
                    userViewModel.getImagen(user.getId()).observeForever(new Observer<ResponseBody>() {
                        @Override
                        public void onChanged(ResponseBody responseBody) {
                            Bitmap bmp = BitmapFactory.decodeStream(responseBody.byteStream());
                            Glide.with(MyApp.getContext())
                                    .load(bmp)
                                    .thumbnail(Glide.with(ProfileFragment.this).load(R.drawable.loading_gif))
                                    .centerCrop()
                                    .into(circularImageView);
                        }
                    });
                }else {
                    Glide.with(MyApp.getContext())
                            .load(R.drawable.ic_user)
                            .thumbnail(Glide.with(ProfileFragment.this).load(R.drawable.loading_gif))
                            .centerCrop()
                            .into(circularImageView);
                }

                fab2.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(
                                getActivity());
                        alertDialogBuilder.setTitle(R.string.validacion);
                        alertDialogBuilder
                                .setMessage(R.string.mensageValidacion)
                                .setCancelable(false)
                                .setPositiveButton(R.string.yes,new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog,int id) {
                                        userViewModel.deletePhoto(user.getId());

                                        Glide.with(MyApp.getContext())
                                                .load(R.drawable.ic_user)
                                                .thumbnail(Glide.with(getActivity()).load(R.drawable.loading_gif))
                                                .centerCrop()
                                                .into(circularImageView);
                                    }
                                })
                                .setNegativeButton(R.string.no,new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog,int id) {
                                        dialog.cancel();
                                    }
                                });
                        AlertDialog alertDialog = alertDialogBuilder.create();
                        alertDialog.show();
                    }
                });

                check.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        if (uriS != null) {

                            try {
                                InputStream inputStream = getActivity().getContentResolver().openInputStream(uriS);
                                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                                BufferedInputStream bufferedInputStream = new BufferedInputStream(inputStream);
                                int cantBytes;
                                byte[] buffer = new byte[1024*4];

                                while ((cantBytes = bufferedInputStream.read(buffer,0,1024*4)) != -1) {
                                    baos.write(buffer,0,cantBytes);
                                }

                                RequestBody requestFile =
                                        RequestBody.create(baos.toByteArray(),
                                                MediaType.parse(getActivity().getContentResolver().getType(uriS)));

                                MultipartBody.Part body =
                                        MultipartBody.Part.createFormData("photo", "photo", requestFile);

                                userViewModel.updatePhoto(user.getId(), body);
                                Toast.makeText(getActivity(), R.string.savePhoto, Toast.LENGTH_SHORT).show();
                                check.setVisibility(View.GONE);
                                cancel.setVisibility(View.GONE);
                            } catch (FileNotFoundException e) {
                                e.printStackTrace();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }else{
                            Toast.makeText(getActivity(), R.string.selecPhoto, Toast.LENGTH_SHORT).show();
                            check.setVisibility(View.GONE);
                            cancel.setVisibility(View.GONE);
                        }
                    }
                });

                cancel.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        uriS = null;
                        userViewModel.getUserDetail(user.getId()).observe(getActivity(), new Observer<UserDetailResponse>() {
                            @Override
                            public void onChanged(UserDetailResponse authLoginUser) {
                                if (user.getPhoto() != null) {
                                    userViewModel.getImagen(user.getId()).observeForever(new Observer<ResponseBody>() {
                                        @Override
                                        public void onChanged(ResponseBody responseBody) {
                                            Bitmap bmp = BitmapFactory.decodeStream(responseBody.byteStream());
                                            Glide.with(MyApp.getContext())
                                                    .load(bmp)
                                                    .thumbnail(Glide.with(getActivity()).load(R.drawable.loading_gif))
                                                    .centerCrop()
                                                    .into(circularImageView);
                                        }
                                    });
                                }else {
                                    Glide.with(MyApp.getContext())
                                            .load(R.drawable.ic_user)
                                            .thumbnail(Glide.with(getActivity()).load(R.drawable.loading_gif))
                                            .centerCrop()
                                            .into(circularImageView);
                                }

                            }
                        });
                        check.setVisibility(View.GONE);
                        cancel.setVisibility(View.GONE);
                    }
                });

                qr.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        Intent i = new Intent(MyApp.getContext(), GenerateQrActivity.class);
                        i.putExtra("id",user.getId());
                        startActivity(i);
                    }
                });

                savePass.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        String emailPas = emailPass.getText().toString();
                        String passActual = passwordActual.getText().toString();
                        String passwordNueva = passawor1.getText().toString();
                        String passwordNueva2 = passswor2.getText().toString();

                        if (passwordNueva.equals(passwordNueva2)){
                            UpdatePasswordDto updatePasswordDto = new UpdatePasswordDto(emailPas, passwordNueva);
                            userViewModel.updatePassword(user.getId(), updatePasswordDto);
                            Toast.makeText(getActivity(), "Contraseña cambiada correctamente.", Toast.LENGTH_SHORT).show();
                            emailPass.setText("");
                            passwordActual.setText("");
                            passawor1.setText("");
                            passswor2.setText("");
                        } else if (user.getPassword().equals(passActual)){
                            Toast.makeText(getActivity(), "Error al introducir la contraseña actual.", Toast.LENGTH_SHORT).show();
                        }else {
                            Toast.makeText(getActivity(), "Las contraseñas no coinciden.", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        });
        return view;
    }

    private void findViews() {
        modulosDTO = new ListModulosDTO();
        moduleViewModel = new ViewModelProvider(this).get(ModuleViewModel.class);
        userViewModel = new ViewModelProvider(this).get(UserViewModel.class);
        nombre = view.findViewById(R.id.textViewNameProfile);
        email = view.findViewById(R.id.textViewEmailProfile);
        fechaNac = view.findViewById(R.id.textViewBirthdateProfile);
        curso = view.findViewById(R.id.textViewCursoProfile);
        fab2 = view.findViewById(R.id.fab2);
        passawor1 = view.findViewById(R.id.editTextPassworProfile);
        passswor2 = view.findViewById(R.id.editTextPassword2Pfrofile);
        savePass = view.findViewById(R.id.buttonSavePassProfile);
        check = view.findViewById(R.id.imageViewCheckPhoto);
        cancel = view.findViewById(R.id.imageViewCancelPhoto);
        emailPass = view.findViewById(R.id.editTextEmailPassword);
        passwordActual = view.findViewById(R.id.editTextPasswordActual);
        qr = view.findViewById(R.id.imageViewQR);

        tvNombreModuloExtra = view.findViewById(R.id.textViewNombreModuloExtra);

        cvModulos = view.findViewById(R.id.CardViewModulos);

        cvModulos.setVisibility(view.GONE);
        qr.setVisibility(view.GONE);

        listaAuxiliarExtra = new ArrayList<>();

        check.setVisibility(View.GONE);
        cancel.setVisibility(View.GONE);

        circularImageView = view.findViewById(R.id.imageViewPhotoProfileAdmin);
        circularImageView.setBorderWidth(3);
        circularImageView.setBorderColor(Color.WHITE);

    }

    public void performFileSearch() {

        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("image/*");
        startActivityForResult(intent, READ_REQUEST_CODE);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == READ_REQUEST_CODE && resultCode == Activity.RESULT_OK) {
            Uri uri = null;
            if (data != null) {
                uri = data.getData();
                Log.i("Filechooser URI", "Uri: " + uri.toString());
                Glide
                        .with(this)
                        .load(uri)
                        .thumbnail(Glide.with(ProfileFragment.this).load(R.drawable.loading_gif))
                        .centerCrop()
                        .into(circularImageView);
                uriS = uri;
                check.setVisibility(View.VISIBLE);
                cancel.setVisibility(View.VISIBLE);
            }
        }
    }
}
