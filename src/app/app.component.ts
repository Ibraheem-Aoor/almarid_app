import { Component } from "@angular/core";
import { Platform, ToastController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Network } from "@ionic-native/network";
import { OneSignal } from '@ionic-native/onesignal';

import { MainLanguagePage } from "../pages/main-language/main-language";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = MainLanguagePage;
  public alertShown: boolean = false;
  page: string = window.localStorage.getItem("page");
  lang: string = window.localStorage.getItem("lang");
  oneSignalKey = "374838ee-fc86-4ec0-9bcc-c231df4f6082";
  firebaseKey = "759975465785";
  constructor(
    public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private network: Network,
    private toastCtrl: ToastController,
    private oneSignal: OneSignal
  ) {
    platform.ready().then(() => {
      platform.setDir("rtl", true);
      if (this.lang == "en") {
        platform.setDir("ltr", true);
        window.localStorage.setItem("lang", "en");
      } else {
        window.localStorage.setItem("lang", "ar");
      }
      this.lang = window.localStorage.getItem("lang");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString("#f6f7f9");
      statusBar.overlaysWebView(false); 
      splashScreen.hide();
      // if (this.page != "home") {
      //   this.rootPage = MainLanguagePage;
      // }

      //one signal
      this.oneSignal.startInit(this.oneSignalKey, "");

     this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
      //   // do something when a notification is opened
      });

       this.oneSignal.endInit();

      
      // network
      this.network.onDisconnect().subscribe(() => {
        console.log("network was disconnected :-(");
        if (this.lang == "en") {
          let toast = this.toastCtrl.create({
            message: "Your internet conection appears to be offline!",
            showCloseButton: true,
            closeButtonText: "Cancel",
            position: "bottom"
          });
          toast.present();
        } else {
          let toast = this.toastCtrl.create({
            message: "يبدو أنك فقدت الإتصال بالإنترنت!",
            showCloseButton: true,
            closeButtonText: "إلغاء",
            position: "bottom"
          });
          toast.present();
        }
      });
    });
  }
}
