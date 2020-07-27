package com.example.convalidapp.ui.asignatura_prof.modulo_detail;

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

import com.example.convalidapp.R;
import com.example.convalidapp.data.viewmodel.UserViewModel;
import com.example.convalidapp.models.UserFullname;

import java.util.ArrayList;
import java.util.List;

public class UsersConvalidadosModulosFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private UserViewModel userViewModel;
    MyUsersConvalidadosModulosRecyclerViewAdapter adapter;
    RecyclerView recyclerView;
    private List<UserFullname> userList;
    Bundle extras;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public UsersConvalidadosModulosFragment() {
    }

    // TODO: Customize parameter initialization
    @SuppressWarnings("unused")
    public static UsersConvalidadosModulosFragment newInstance(int columnCount) {
        UsersConvalidadosModulosFragment fragment = new UsersConvalidadosModulosFragment();
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
        extras = getActivity().getIntent().getExtras();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_users_convalidados_modulos_list, container, false);

        // Set the adapter
        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }
            userList = new ArrayList<>();

            adapter = new MyUsersConvalidadosModulosRecyclerViewAdapter(getActivity(), userList, userViewModel);
            recyclerView.setAdapter(adapter);

            loadUsersModuloConvalidado();
        }
        return view;
    }

    private void loadUsersModuloConvalidado() {
        userViewModel.getUsersConvalidadosProf(extras.getString("idModuloConvalidadoUser")).observe(getActivity(), new Observer<List<UserFullname>>() {
            @Override
            public void onChanged(List<UserFullname> users) {
                userList = users;
                adapter.setData(userList);
            }
        });
    }
}
