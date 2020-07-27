package com.example.convalidapp.ui.asignatura_prof.modulo_detail;

import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.convalidapp.R;
import com.example.convalidapp.data.viewmodel.UserViewModel;
import com.example.convalidapp.models.UserFullname;

import java.util.ArrayList;
import java.util.List;

public class MyUsersConvalidadosModulosRecyclerViewAdapter extends RecyclerView.Adapter<MyUsersConvalidadosModulosRecyclerViewAdapter.ViewHolder> {

    private  List<UserFullname> mValues;
    UserViewModel userViewModel;
    Context context;

    public MyUsersConvalidadosModulosRecyclerViewAdapter(Context ctx, List<UserFullname> items, UserViewModel userViewModel) {
        this.context = ctx;
        mValues = items;
        this.userViewModel = userViewModel;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_users_convalidados_modulos, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.tvNombre.setText(holder.mItem.getFullname());
        holder.tvEmail.setText(holder.mItem.getEmail());
        holder.tvFecha.setText(holder.mItem.getBirthdate());

        /*holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (null != mListener) {
                    // Notify the active callbacks interface (the activity, if the
                    // fragment is attached to one) that an item has been selected.
                    mListener.onListFragmentInteraction(holder.mItem);
                }
            }
        });
         */
    }

    public void setData(List<UserFullname> users) {
        if (this.mValues != null)
            this.mValues.clear();
        else
            this.mValues = new ArrayList<>();
        this.mValues.addAll(users);
        notifyDataSetChanged();
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView tvNombre;
        public final TextView tvEmail;
        public final TextView tvFecha;
        public UserFullname mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            tvNombre = view.findViewById(R.id.textViewNombreUserModuloConv);
            tvEmail = view.findViewById(R.id.textViewEmailUserModuloConv);
            tvFecha = view.findViewById(R.id.textViewFechaUserModuloConv);
        }
    }
}
