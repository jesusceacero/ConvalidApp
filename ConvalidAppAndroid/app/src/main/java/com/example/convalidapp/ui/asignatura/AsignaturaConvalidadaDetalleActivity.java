package com.example.convalidapp.ui.asignatura;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;
import android.widget.TextView;

import com.example.convalidapp.R;
import com.example.convalidapp.data.viewmodel.AsignaturaViewModel;
import com.example.convalidapp.models.AsignaturaDetailResponse;

public class AsignaturaConvalidadaDetalleActivity extends AppCompatActivity {

    AsignaturaViewModel asignaturaViewModel;
    TextView tvNombre, tvAcronimo, tvProfesor, tvHora, tvDia;
    Bundle extras;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_asignatura_convalidada_detalle);

        retrofitInit();
        findViews();
        event();
    }

    private void retrofitInit() {
        asignaturaViewModel = new ViewModelProvider(this).get(AsignaturaViewModel.class);
        extras = getIntent().getExtras();
    }

    private void findViews() {
        tvAcronimo = findViewById(R.id.textViewAcronimoAsigConvDet);
        tvNombre = findViewById(R.id.textViewNombreAsigConvDet);
        tvProfesor = findViewById(R.id.textViewProfesorAsigConvDet);
        tvDia = findViewById(R.id.textViewDiaAsigConvDet);
        tvHora = findViewById(R.id.textViewHoraAsigConvDet);
    }

    private void event() {
        asignaturaViewModel.getAsignaturaDetail(extras.getString("idAsignaturaConvalidada")).observe(this, new Observer<AsignaturaDetailResponse>() {
            @Override
            public void onChanged(AsignaturaDetailResponse asignaturaDetailResponse) {
                tvAcronimo.setText(asignaturaDetailResponse.getAcronym());
                tvNombre.setText(asignaturaDetailResponse.getName());
                tvProfesor.setText(asignaturaDetailResponse.getTeacher());
                tvDia.setText(extras.getString("diaAsig"));
                tvHora.setText(extras.getString("horaAsig"));
            }
        });
    }
}
