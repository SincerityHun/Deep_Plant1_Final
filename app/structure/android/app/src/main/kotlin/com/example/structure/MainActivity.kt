package com.example.structure

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.EventChannel
import io.flutter.plugin.common.MethodChannel
import com.bixolon.labelprinter.BixolonLabelPrinter
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.os.Message
import android.util.Log


class MainActivity : FlutterActivity() {
    private val eventChannel = "com.example.structure/barcode"
    private var barcodeReceiver: BroadcastReceiver? = null
    
    private var printerStatusEventSink: EventChannel.EventSink? = null

    private val printerChannel = "com.example.structure/printer"
    private lateinit var mPrinter: BixolonLabelPrinter
    private val mHandler = object : Handler(Looper.getMainLooper()) {
        override fun handleMessage(msg: Message) {
            when (msg.what) {
                BixolonLabelPrinter.MESSAGE_STATE_CHANGE -> {
                    when (msg.arg1) {
                        BixolonLabelPrinter.STATE_CONNECTED -> {
                            printerStatusEventSink?.success("CONNECTED")
                        }
                        BixolonLabelPrinter.STATE_CONNECTING -> {
                            printerStatusEventSink?.success("CONNECTING")
                        }
                        BixolonLabelPrinter.STATE_NONE -> {
                            printerStatusEventSink?.success("DISCONNECTED")
                        }
                    }
                }
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // BixolonLabelPrinter 인스턴스를 초기화합니다.
        mPrinter = BixolonLabelPrinter(this, mHandler, null)
    }

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        EventChannel(flutterEngine.dartExecutor.binaryMessenger, eventChannel).setStreamHandler(
            object : EventChannel.StreamHandler {
                override fun onListen(arguments: Any?, events: EventChannel.EventSink) {
                    registerBarcodeReceiver(events)
                }

                override fun onCancel(arguments: Any?) {
                    unregisterBarcodeReceiver()
                }
            }
        )

        EventChannel(flutterEngine.dartExecutor.binaryMessenger, "com.example.structure/printerStatus").setStreamHandler(
        object : EventChannel.StreamHandler {
                override fun onListen(arguments: Any?, events: EventChannel.EventSink?) {
                    printerStatusEventSink = events
                }

                override fun onCancel(arguments: Any?) {
                    printerStatusEventSink = null
                }
            }
        )

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, printerChannel).setMethodCallHandler { call, result ->
            when (call.method) {
                "connect" -> {
                    val printerAddress = "192.168.1.1"
                    val printerPort = 9100
                    val connectionTimeout = 5000
                    mPrinter.connect(printerAddress, printerPort, connectionTimeout)
                    result.success(null)
                }
                "printQr" -> {
                    val qrData: String? = call.argument("qrData") // "qrData" is the key we used in Dart
                    if (qrData != null) {
                        mPrinter.drawQrCode(qrData, 200, 150, BixolonLabelPrinter.QR_CODE_MODEL2, BixolonLabelPrinter.ECC_LEVEL_15, 9, BixolonLabelPrinter.ROTATION_NONE)
                        mPrinter.print(1, 1)
                        result.success("Printing QR code with data: $qrData")
                    } else {
                        result.error("NULL_QR_DATA", "QR data is null", null)
                    }
                }
                else -> result.notImplemented()
            }
        }
    }

    private fun registerBarcodeReceiver(eventSink: EventChannel.EventSink) {
        val filter = IntentFilter("app.dsic.barcodetray.BARCODE_BR_DECODING_DATA")
        barcodeReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                if (intent.action == "app.dsic.barcodetray.BARCODE_BR_DECODING_DATA") {
                    val symbologyIdent = BarcodeDeclaration.SYMBOLOGY_IDENT.fromInteger(
                        intent.getIntExtra("EXTRA_BARCODE_DECODED_SYMBOLE", -1)
                    )
                    val data =
                        if (symbologyIdent != BarcodeDeclaration.SYMBOLOGY_IDENT.NOT_READ) {
                            intent.getStringExtra("EXTRA_BARCODE_DECODED_DATA")
                        } else {
                            "NOT READ"
                        }
                    eventSink.success(data)
                }
            }
        }
        registerReceiver(barcodeReceiver, filter)
    }



    private fun unregisterBarcodeReceiver() {
        barcodeReceiver?.let { receiver ->
            unregisterReceiver(receiver)
            barcodeReceiver = null
        }
    }
}
