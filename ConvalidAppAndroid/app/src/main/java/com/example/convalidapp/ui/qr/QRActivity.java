package com.example.convalidapp.ui.qr;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.convalidapp.R;
import com.example.convalidapp.ui.users.DetalleUsersActivity;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;


public class QRActivity extends AppCompatActivity {

    Button btnEndQr;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_q_r);

        IntentIntegrator intent = new IntentIntegrator(QRActivity.this);
        intent.setDesiredBarcodeFormats(IntentIntegrator.QR_CODE_TYPES);

        btnEndQr = findViewById(R.id.buttonEndQrActivity);

        intent.setPrompt("Scan");
        intent.setCameraId(0);
        intent.setBeepEnabled(false);
        intent.setBarcodeImageEnabled(false);
        intent.initiateScan();

        btnEndQr.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if (result != null){
            if (result.getContents() == null){
            }
            else{
                String base = result.getContents();
                if (!base.isEmpty()){
                    Intent i = new Intent(QRActivity.this, DetalleUsersActivity.class);
                    i.putExtra("id",result.getContents());
                    startActivity(i);
                }else{
                    Toast.makeText(this, "El codigo QR leido no se reconoce.", Toast.LENGTH_SHORT).show();
                }
                finish();
            }
        }
        else
        {
            super.onActivityResult(requestCode, resultCode, data);

        }
    }
}
