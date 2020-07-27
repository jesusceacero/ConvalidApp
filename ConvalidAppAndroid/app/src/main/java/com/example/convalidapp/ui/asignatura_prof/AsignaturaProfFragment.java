package com.example.convalidapp.ui.asignatura_prof;

import android.content.Context;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.convalidapp.R;
import com.example.convalidapp.commons.Constants;
import com.example.convalidapp.commons.SharedPreferencesManager;
import com.example.convalidapp.data.viewmodel.ModuleViewModel;
import com.example.convalidapp.data.viewmodel.UserViewModel;
import com.example.convalidapp.models.ListModulosDTO;
import com.example.convalidapp.models.Module;
import com.example.convalidapp.models.UserDetailResponse;

import java.util.ArrayList;
import java.util.List;

public class AsignaturaProfFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private UserViewModel userViewModel;
    MyAsignaturaProfRecyclerViewAdapter adapter;
    RecyclerView recyclerView;
    private ModuleViewModel moduleViewModel;
    private List<Module> moduleList;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public AsignaturaProfFragment() {
    }

    // TODO: Customize parameter initialization
    @SuppressWarnings("unused")
    public static AsignaturaProfFragment newInstance(int columnCount) {
        AsignaturaProfFragment fragment = new AsignaturaProfFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
        userViewModel = new ViewModelProvider(getActivity()).get(UserViewModel.class);
        moduleViewModel = new ViewModelProvider(getActivity()).get(ModuleViewModel.class);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_asignatura_prof_list, container, false);

        // Set the adapter
        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }
            moduleList = new ArrayList<>();

            adapter = new MyAsignaturaProfRecyclerViewAdapter(getActivity(), moduleList, userViewModel);
            recyclerView.setAdapter(adapter);

            loadAsignaturasImparteProfesor();
        }
        return view;
    }

    private void loadAsignaturasImparteProfesor() {
        userViewModel.getUserDetail(SharedPreferencesManager.getStringValue(Constants.SHARED_PREFERENCES_ID)).observe(getActivity(), new Observer<UserDetailResponse>() {
            @Override
            public void onChanged(UserDetailResponse user) {
                if (user.getImparte().isEmpty() || user.getImparte() == null)
                    Toast.makeText(getActivity(), "No imparte ningún módulo", Toast.LENGTH_SHORT).show();
                else {
                    ListModulosDTO conva = new ListModulosDTO(user.getImparte());
                    moduleViewModel.getModulosID(conva).observe(getActivity(), new Observer<List<Module>>() {
                        @Override
                        public void onChanged(List<Module> modules) {
                            moduleList = modules;
                            adapter.setData(moduleList);
                        }
                    });
                }
            }
        });
    }

}
