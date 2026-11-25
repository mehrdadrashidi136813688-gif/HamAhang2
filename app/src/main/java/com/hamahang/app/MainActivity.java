package com.hamahang.app;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.JavascriptInterface;
import android.view.View;
import android.view.Window;
import android.widget.Toast;

public class MainActivity extends Activity {
    private WebView web;
    private long lastBackPress = 0;
    private volatile String currentScreen = "home";
    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Window w = getWindow();
        // v6: light luxury theme status/nav
        w.setStatusBarColor(0xFFFFFCF7);
        w.setNavigationBarColor(0xFFFFFCF7);
        View decor = w.getDecorView();
        decor.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR);
        web = new WebView(this);
        setContentView(web);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowContentAccess(false);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setDefaultTextEncodingName("UTF-8");
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        web.setWebViewClient(new WebViewClient());
        web.addJavascriptInterface(new AppBridge(), "HamahangBridge");
        if (savedInstanceState != null) web.restoreState(savedInstanceState);
        else web.loadUrl("file:///android_asset/index.html");
    }
    @Override protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        if (web != null) web.saveState(outState);
    }
    @Override public void onBackPressed() {
        if (web != null && !"home".equals(currentScreen) && web.canGoBack()) {
            web.goBack();
            lastBackPress = 0;
            return;
        }
        long now = System.currentTimeMillis();
        if (now - lastBackPress < 2200) {
            super.onBackPressed();
        } else {
            lastBackPress = now;
            Toast.makeText(this, "برای خروج، یک بار دیگر دکمه بازگشت را بزنید", Toast.LENGTH_SHORT).show();
        }
    }
    private class AppBridge {
        @JavascriptInterface public void setScreen(String screen) {
            currentScreen = screen == null ? "home" : screen;
        }
    }
}
