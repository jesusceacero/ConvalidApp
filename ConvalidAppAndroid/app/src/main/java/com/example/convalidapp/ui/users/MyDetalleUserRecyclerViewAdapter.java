package com.example.convalidapp.ui.users;

import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.RecyclerView;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.convalidapp.R;
import com.example.convalidapp.commons.MyApp;
import com.example.convalidapp.data.viewmodel.HistorialViewModel;
import com.example.convalidapp.models.HistorialDto;
import com.example.convalidapp.models.HorarioDTO;

import java.util.List;

public class MyDetalleUserRecyclerViewAdapter extends RecyclerView.Adapter<MyDetalleUserRecyclerViewAdapter.ViewHolder> {

    private final List<HorarioDTO> mValues;
    private Context ctx;
    private List<String> convalidados;
    private HistorialViewModel historialViewModel;
    private String idUser;
    private String idHorario;

    public MyDetalleUserRecyclerViewAdapter(Context ctx ,List<HorarioDTO> items,List<String> convalidados,HistorialViewModel historialViewModel) {
        this.mValues = items;
        this.ctx = ctx;
        this.convalidados= convalidados;
        this.historialViewModel = historialViewModel;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_detalle_user, parent, false);
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
                holder.register.setVisibility(View.VISIBLE);
            }
        }

        holder.register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(
                        ctx);
                alertDialogBuilder.setTitle(R.string.registrar);
                alertDialogBuilder
                        .setMessage(R.string.mensajeRegitrar)
                        .setCancelable(false)
                        .setPositiveButton(R.string.yes,new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog,int id) {
                                holder.register.setVisibility(View.GONE);
                                HistorialDto h = new HistorialDto(
                                        holder.mItem.getIduser(),
                                        holder.mItem.getId(),
                                        holder.mItem.getIdHorario()
                                );
                                historialViewModel.addHistorial(h);

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
        public final ImageView register;
        public final ConstraintLayout card;
        public HorarioDTO mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            nombre = view.findViewById(R.id.textViewNombreModuloDetalle);
            hora = view.findViewById(R.id.textViewHorarioDetalle);
            porfesor = view.findViewById(R.id.textViewNombreProfesorDetalle);
            acronimo = view.findViewById(R.id.textViewAcronimoHorarioDetalle);
            card = view.findViewById(R.id.moduloConvalidadDetalle);
            register = view.findViewById(R.id.imageViewRegister);
        }

    }
}
