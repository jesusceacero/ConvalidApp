package com.example.convalidapp.ui.asignatura;

import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.convalidapp.R;
import com.example.convalidapp.data.viewmodel.UserViewModel;
import com.example.convalidapp.models.Module;

import java.util.ArrayList;
import java.util.List;

public class MyAsignaturaRecyclerViewAdapter extends RecyclerView.Adapter<MyAsignaturaRecyclerViewAdapter.ViewHolder> {

    private List<Module> mValues;
    UserViewModel userViewModel;
    Context context;

    public MyAsignaturaRecyclerViewAdapter(Context ctx, List<Module> items, UserViewModel userViewModel) {
        this.context = ctx;
        mValues = items;
        this.userViewModel = userViewModel;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_asignatura, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, final int position) {
        holder.mItem = mValues.get(position);
        holder.tvNombre.setText(holder.mItem.getName());
        holder.tvAcronimo.setText(holder.mItem.getAcronym());
        holder.tvProfesor.setText(holder.mItem.getTeacher().getFullname());

        //holder.mView.setOnClickListener(new View.OnClickListener() {
         //   @Override
         //   public void onClick(View v) {
          //      Intent intent = new Intent(context, AsignaturaConvalidadaDetalleActivity.class);
          //      intent.putExtra("idAsignaturaConvalidada", holder.mItem.getId());
          //      intent.putExtra("diaAsig", holder.mItem.getHorario().get(position).getDia());
          //      intent.putExtra("horaAsig", holder.mItem.getHorario().get(position).getHora());
          //      context.startActivity(intent);
          //  }
       // });
    }

    public void setData(List<Module> modules) {
        if (this.mValues != null)
            this.mValues.clear();
        else
            this.mValues = new ArrayList<>();
        this.mValues.addAll(modules);
        notifyDataSetChanged();
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView tvNombre;
        public final TextView tvAcronimo;
        public final TextView tvProfesor;
        public Module mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            tvNombre = view.findViewById(R.id.textViewNombreAsigConv);
            tvAcronimo = view.findViewById(R.id.textViewAcronimoAsigConv);
            tvProfesor = view.findViewById(R.id.textViewProfesorAsigConv);
        }
    }
}
