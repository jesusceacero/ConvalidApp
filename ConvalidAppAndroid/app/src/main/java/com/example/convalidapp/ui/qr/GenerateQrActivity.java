package com.example.convalidapp.ui.qr;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.widget.ImageView;

import com.example.convalidapp.R;
import net.glxn.qrgen.android.QRCode;

public class GenerateQrActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_generate_qr);

        String texto = getIntent().getExtras().getString("id");
        Bitmap bitmap = QRCode.from(texto).bitmap();
        ImageView imagenCodigo = findViewById(R.id.imageViewGernerateQR);
        imagenCodigo.setImageBitmap(bitmap);

    }
}
