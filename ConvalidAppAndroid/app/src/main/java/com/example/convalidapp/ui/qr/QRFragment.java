package com.example.convalidapp.ui.qr;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.example.convalidapp.R;


public class QRFragment extends Fragment {

    private View view;
    private Button qr;

    public QRFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_q_r, container, false);
        qr = view.findViewById(R.id.buttonQR);
        Intent i = new Intent(getActivity(), QRActivity.class);
        getActivity().startActivity(i);

        qr.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(getActivity(), QRActivity.class);
                getActivity().startActivity(i);
            }
        });
        return view;
    }
}
