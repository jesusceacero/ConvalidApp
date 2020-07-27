package com.example.convalidapp.ui.users;

import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.lifecycle.ViewModelStoreOwner;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.convalidapp.R;
import com.example.convalidapp.commons.MyApp;
import com.example.convalidapp.data.viewmodel.UserViewModel;
import com.example.convalidapp.models.UserDtoList;
import com.example.convalidapp.ui.profile.ProfileFragment;
import com.example.convalidapp.ui.users.dummy.DummyContent.DummyItem;

import java.util.ArrayList;
import java.util.List;

import okhttp3.ResponseBody;

public class MyusersRecyclerViewAdapter extends RecyclerView.Adapter<MyusersRecyclerViewAdapter.ViewHolder> {

    private List<UserDtoList> mValues;
    private Context ctx;
    UserViewModel userViewModel;

    public MyusersRecyclerViewAdapter(Context ctx, List<UserDtoList> items, UserViewModel userViewModel) {
        this.ctx = ctx;
        this.mValues = items;
        this.userViewModel = userViewModel;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_users, parent, false);
        userViewModel = new ViewModelProvider((ViewModelStoreOwner) ctx).get(UserViewModel.class);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);

        holder.nombre.setText(holder.mItem.getName());
        holder.acromino.setText(holder.mItem.getAcronimo());
        holder.ema.setText(holder.mItem.getEmail());
        Log.i("id",""+holder.mItem.getId());

        if (holder.mItem.getFoto() == null){
            Glide.with(ctx)
                    .load(R.drawable.ic_user)
                    .circleCrop()
                    .into(holder.foto);
        } else {
            userViewModel.getImagen(holder.mItem.getId()).observeForever(new Observer<ResponseBody>() {
                @Override
                public void onChanged(ResponseBody responseBody) {
                    Bitmap bmp = BitmapFactory.decodeStream(responseBody.byteStream());
                    Glide.with(MyApp.getContext())
                            .load(bmp)
                            //.thumbnail(Glide.with(ctx).load(R.drawable.loading_gif))
                            .circleCrop()
                            .into(holder.foto);
                }
            });
        }
        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ctx, DetalleUsersActivity.class);
                intent.putExtra("id", holder.mItem.getId());
                ctx.startActivity(intent);
            }
        });


    }

    public void setData(List<UserDtoList> list){
        if(this.mValues != null) {
            this.mValues.clear();
        } else {
            this.mValues =  new ArrayList<>();
        }
        this.mValues.addAll(list);
        notifyDataSetChanged();
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public TextView nombre;
        public TextView acromino;
        public TextView ema;
        public ImageView foto;
        public UserDtoList mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            nombre = view.findViewById(R.id.textViewNombreUser);
            acromino = view.findViewById(R.id.textViewAcronimoCurso);
            ema = view.findViewById(R.id.textViewEmailListUser);
            foto = view.findViewById(R.id.imageViewListUser);
        }
    }
}
