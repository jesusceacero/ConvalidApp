package com.example.convalidapp.ui.Schedule;

import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.convalidapp.R;
import com.example.convalidapp.models.HorarioDTO;

import java.util.List;

public class MySheculeRecyclerViewAdapter extends RecyclerView.Adapter<MySheculeRecyclerViewAdapter.ViewHolder> {

    private final List<HorarioDTO> mValues;
    private Context ctx;
    private List<String> convalidados;

    public MySheculeRecyclerViewAdapter(Context ctx ,List<HorarioDTO> items,List<String> convalidados) {
        this.mValues = items;
        this.ctx = ctx;
        this.convalidados= convalidados;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_shecule, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);

        holder.acronimo.setText(holder.mItem.getAcronimo());
        holder.porfesor.setText(holder.mItem.getNombrePRofesor());
        holder.hora.setText(holder.mItem.getHora());
        holder.nombre.setText(holder.mItem.getNombreCurso());
        for (String m: convalidados) {
            if(holder.mItem.getId().equals(m)){
                holder.card.setBackgroundResource(R.drawable.modulo_convalidado);
            }

        }

    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView nombre;
        public final TextView hora;
        public final TextView porfesor;
        public final TextView acronimo;
        public final ConstraintLayout card;
        public HorarioDTO mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            nombre = view.findViewById(R.id.textViewNombreModulo);
            hora = view.findViewById(R.id.textViewHorario);
            porfesor = view.findViewById(R.id.textViewNombreProfesor);
            acronimo = view.findViewById(R.id.textViewAcronimoHorario);
            card = view.findViewById(R.id.moduloConvalidad);
        }
    }
}
