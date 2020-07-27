package com.example.convalidapp.ui.users;

import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.UserHandle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.SearchView;

import com.example.convalidapp.R;
import com.example.convalidapp.data.viewmodel.CourseViewModel;
import com.example.convalidapp.data.viewmodel.UserViewModel;
import com.example.convalidapp.models.Course;
import com.example.convalidapp.models.UserDetailResponse;
import com.example.convalidapp.models.UserDtoList;

import java.util.ArrayList;
import java.util.List;


public class usersFragment extends Fragment {

    private static final String ARG_COLUMN_COUNT = "column-count";
    private int mColumnCount = 1;
    private Context context;
    private View view;
    private RecyclerView recyclerView;
    private UserViewModel userViewModel;
    private CourseViewModel courseViewModel;
    private List<UserDtoList> listadoUser;
    private MyusersRecyclerViewAdapter adapter;
    private MenuItem busqueda;

    public usersFragment() {
    }

    public static usersFragment newInstance(int columnCount) {
        usersFragment fragment = new usersFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHasOptionsMenu(true);
        userViewModel = new ViewModelProvider(getActivity()).get(UserViewModel.class);
        courseViewModel = new ViewModelProvider(getActivity()).get(CourseViewModel.class);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_users_list, container, false);

        listadoUser = new ArrayList<>();
        if (view instanceof RecyclerView) {
            context = view.getContext();
            recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }
            adapter = new MyusersRecyclerViewAdapter(
                    context,
                    listadoUser,
                    userViewModel
            );
            recyclerView.setAdapter(adapter);
            userViewModel.getUsuarios().observe(getActivity(), new Observer<List<UserDetailResponse>>() {
                @Override
                public void onChanged(final List<UserDetailResponse> userDetailResponses) {
                    for (final UserDetailResponse u: userDetailResponses) {
                        courseViewModel.getCouerse(u.getCourse()).observe(getActivity(), new Observer<Course>() {
                            @Override
                            public void onChanged(Course course) {
                                List<String> l = new ArrayList<>();
                                l.add(u.getFullname());
                                l.add(u.getEmail());
                                l.add(course.getAcronym());
                                UserDtoList user = new UserDtoList(
                                        u.getId(),
                                        u.getFullname(),
                                        course.getAcronym(),
                                        u.getEmail(),
                                        u.getPhoto(),
                                        l
                                );
                                Log.i("usuario"," " + ""+user);
                                listadoUser.add(user);
                                if (u.getId().equals(userDetailResponses.get(userDetailResponses.size()-1).getId())){
                                    Log.i("entra","entra");
                                    Log.i("lista", ""+listadoUser);
                                    adapter.notifyDataSetChanged();
                                }
                            }
                        });
                    }
                }
            });
        }
        return view;
    }

    public List<UserDtoList> busqueda(String palabraClave){
        List<UserDtoList> result = new ArrayList<>();
        for (UserDtoList user : listadoUser ){
            for (String palabraClaveList : user.getPalabrasClave()){
                if(palabraClaveList.equalsIgnoreCase(palabraClave) || palabraClaveList.toLowerCase().contains(palabraClave.toLowerCase())){
                    if (!result.contains(user)){
                        result.add(user);
                    }
                }
            }
        }
        adapter.setData(result);
        return result;
    }

    @Override
    public void onCreateOptionsMenu(@NonNull Menu menu, @NonNull MenuInflater inflater) {
        super.onPrepareOptionsMenu(menu);
        getActivity().getMenuInflater().inflate(R.menu.menu_user,menu);
        busqueda = menu.findItem(R.id.app_bar_search);
        SearchView searchView = (SearchView) busqueda.getActionView();
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                List<UserDtoList> lista = busqueda(newText);
                cargarBusqueda(lista);
                return false;
            }
        });
        super.onCreateOptionsMenu(menu, inflater);
    }

    public void cargarBusqueda (List<UserDtoList> busqueda){
        adapter.setData(busqueda);
        adapter.notifyDataSetChanged();
    }
}
