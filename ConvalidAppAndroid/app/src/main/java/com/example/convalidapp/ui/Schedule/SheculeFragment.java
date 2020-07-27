package com.example.convalidapp.ui.Schedule;

import android.content.Context;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.example.convalidapp.R;
import com.example.convalidapp.commons.Constants;
import com.example.convalidapp.commons.SharedPreferencesManager;
import com.example.convalidapp.data.viewmodel.CourseViewModel;
import com.example.convalidapp.data.viewmodel.ModuleViewModel;
import com.example.convalidapp.data.viewmodel.UserViewModel;
import com.example.convalidapp.models.Course;
import com.example.convalidapp.models.Horario;
import com.example.convalidapp.models.HorarioDTO;
import com.example.convalidapp.models.ListModulosDTO;
import com.example.convalidapp.models.Module;
import com.example.convalidapp.models.UserDetailResponse;

import org.joda.time.LocalDate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class SheculeFragment extends Fragment {

    private static final String ARG_COLUMN_COUNT = "column-count";
    private int mColumnCount = 1;
    private Context context;
    private RecyclerView recyclerView;
    private View view;
    private MySheculeRecyclerViewAdapter adapter;
    private CourseViewModel couerseViewModel;
    private UserViewModel userViewModel;
    private ModuleViewModel moduleViewModel;
    private List<HorarioDTO> horario;
    private List<HorarioDTO> lunes;
    private List<HorarioDTO> martes;
    private List<HorarioDTO> miercoles;
    private List<HorarioDTO> jueves;
    private List<HorarioDTO> viernes;
    private HorarioDTO hora;
    private Button l,m,x,j,v;
    private List<String> convalidados;



    public SheculeFragment() {
    }

    public static SheculeFragment newInstance(int columnCount) {
        SheculeFragment fragment = new SheculeFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        couerseViewModel = new ViewModelProvider(getActivity()).get(CourseViewModel.class);
        userViewModel = new ViewModelProvider(getActivity()).get(UserViewModel.class);
        moduleViewModel = new ViewModelProvider(getActivity()).get(ModuleViewModel.class);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_shecule_list, container, false);
        l = view.findViewById(R.id.buttonLunes);
        m= view.findViewById(R.id.buttonMartes);
        x = view.findViewById(R.id.buttonMiercoles);
        j = view.findViewById(R.id.buttonJueves);
        v = view.findViewById(R.id.buttonViernes);
        horario = new ArrayList<>();
        lunes = new ArrayList<>();
        martes = new ArrayList<>();
        miercoles = new ArrayList<>();
        jueves = new ArrayList<>();
        viernes = new ArrayList<>();

        l.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loadLunes();
            }
        });

        m.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loadMartes();
            }
        });

        x.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loadMiercoles();
            }
        });

        j.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loadJueves();
            }
        });

        v.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loadViernes();
            }
        });


            context = view.getContext();
            recyclerView = view.findViewById(R.id.listSchedules);
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }

            userViewModel.getUserDetail(SharedPreferencesManager.getStringValue(Constants.SHARED_PREFERENCES_ID))
                    .observe(getActivity(), new Observer<UserDetailResponse>() {
                        @Override
                        public void onChanged(UserDetailResponse userDetailResponse) {
                            convalidados = userDetailResponse.getConvalidados();
                            couerseViewModel.getCouerse(userDetailResponse.getCourse()).observe(getActivity(), new Observer<Course>() {
                                @Override
                                public void onChanged(final Course course) {
                                    ListModulosDTO l = new ListModulosDTO(course.getModules());
                                    moduleViewModel.getModulosID(l).observe(getActivity(), new Observer<List<Module>>() {
                                        @Override
                                        public void onChanged(List<Module> modules) {
                                            for (Module m: modules) {
                                                for (Horario h: m.getHorario()){
                                                    String horaModi;
                                                    if (h.getHora().contains("1")){
                                                        horaModi = h.getHora();
                                                    }else {
                                                        horaModi = "0"+h.getHora();
                                                    }
                                                    hora = new HorarioDTO(
                                                            m.getId(),
                                                            m.getName(),
                                                            m.getTeacher().getFullname(),
                                                            m.getAcronym(),
                                                            horaModi,
                                                            null,
                                                            null
                                                    );
                                                    switch (h.getDia().toLowerCase()){
                                                        case "lunes":
                                                            lunes.add(hora);
                                                            break;
                                                        case "martes":
                                                            martes.add(hora);
                                                            break;
                                                        case "miercoles":
                                                            miercoles.add(hora);
                                                        case "jueves":
                                                            jueves.add(hora);
                                                            break;
                                                        case "viernes":
                                                            viernes.add(hora);
                                                            break;
                                                    }
                                                    if (m.getId().equals(modules.get(modules.size()-1).getId())
                                                            && h.getId().equals(m.getHorario().get(m.getHorario().size()-1).getId())){
                                                        LocalDate l = new LocalDate();
                                                        int dia = l.getDayOfWeek();
                                                        switch (dia){
                                                            case 1:
                                                                loadLunes();
                                                                break;
                                                            case 2:
                                                                loadMartes();
                                                                break;
                                                            case 3:
                                                                loadMiercoles();
                                                            case 4:
                                                                loadJueves();
                                                                break;
                                                            case 5:
                                                                loadViernes();
                                                                break;
                                                            case 6:
                                                                loadLunes();
                                                                break;
                                                            case 7:
                                                                loadLunes();
                                                                break;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });

        return view;
    }

    public void loadLunes(){
        Log.i("lunes", " "+ lunes);
        Collections.sort(lunes, new Comparator<HorarioDTO>() {
            @Override
            public int compare(HorarioDTO x, HorarioDTO y) {
                return x.getHora().compareToIgnoreCase(y.getHora());
            }
        });
        horario = new ArrayList<>();
        adapter = new MySheculeRecyclerViewAdapter(
                context,
                horario,
                convalidados
        );
        recyclerView.setAdapter(adapter);
        horario.addAll(lunes);
        Log.i("lunes2", " "+ horario);
        adapter.notifyDataSetChanged();
    }

    public void loadMartes(){
        Log.i("martes", " "+ martes);
        Collections.sort(martes, new Comparator<HorarioDTO>() {
            @Override
            public int compare(HorarioDTO x, HorarioDTO y) {
                return x.getHora().compareToIgnoreCase(y.getHora());
            }
        });
        horario = new ArrayList<>();
        adapter = new MySheculeRecyclerViewAdapter(
                context,
                horario,
                convalidados
        );
        recyclerView.setAdapter(adapter);
        horario.addAll(martes);
        adapter.notifyDataSetChanged();
    }

    public void loadMiercoles(){
        Log.i("miercoles", " "+ miercoles);
        Collections.sort(miercoles, new Comparator<HorarioDTO>() {
            @Override
            public int compare(HorarioDTO x, HorarioDTO y) {
                return x.getHora().compareToIgnoreCase(y.getHora());
            }
        });
        horario = new ArrayList<>();
        adapter = new MySheculeRecyclerViewAdapter(
                context,
                horario,
                convalidados
        );
        recyclerView.setAdapter(adapter);
        horario.addAll(miercoles);
        adapter.notifyDataSetChanged();
    }

    public void loadJueves(){
        Log.i("jueves", " "+ jueves);
        Collections.sort(jueves, new Comparator<HorarioDTO>() {
            @Override
            public int compare(HorarioDTO x, HorarioDTO y) {
                return x.getHora().compareToIgnoreCase(y.getHora());
            }
        });
        horario = new ArrayList<>();
        adapter = new MySheculeRecyclerViewAdapter(
                context,
                horario,
                convalidados
        );
        recyclerView.setAdapter(adapter);
        horario.addAll(jueves);
        adapter.notifyDataSetChanged();
    }
    public void loadViernes(){
        Log.i("viernes", " "+ viernes);
        Collections.sort(viernes, new Comparator<HorarioDTO>() {
            @Override
            public int compare(HorarioDTO x, HorarioDTO y) {
                return x.getHora().compareToIgnoreCase(y.getHora());
            }
        });
        horario = new ArrayList<>();
        adapter = new MySheculeRecyclerViewAdapter(
                context,
                horario,
                convalidados
        );
        recyclerView.setAdapter(adapter);
        horario.addAll(viernes);
        adapter.notifyDataSetChanged();
    }

}
