import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";
import { CarsPage } from "../pages/cars/cars";
import { FollowOrderPage } from "../pages/follow-order/follow-order";
import { MorePage } from "../pages/more/more";
import { SearchPage } from "../pages/search/search";
import { MainLanguagePage } from "../pages/main-language/main-language";
import { WelcomePage } from "../pages/welcome/welcome";
import { CarDetailsPage } from "../pages/car-details/car-details";
import { ReserveInfoPage } from "../pages/reserve-info/reserve-info";
import { ReserveSuccessPage } from "../pages/reserve-success/reserve-success";
import { OrderStatusPage } from "../pages/order-status/order-status";
import { FaqPage } from "../pages/faq/faq";
import { LangModlePage } from "../pages/lang-modle/lang-modle";
import { ViewCarsPage } from "../pages/view-cars/view-cars";
import { PoliciesPage } from "../pages/policies/policies";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SocialSharing } from "@ionic-native/social-sharing";
import { CallNumber } from "@ionic-native/call-number";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Geolocation } from "@ionic-native/geolocation";
import { Network } from "@ionic-native/network";
import { IonicImageViewerModule } from "ionic-img-viewer";
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser'
import { MsgProvider } from "../providers/msg/msg";
import { IonicStorageModule } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';

import { SelectPage } from "../pages/select/select";
import { SelectModalPage } from "../pages/select-modal/select-modal";
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CarsPage,
    FollowOrderPage,
    MorePage,
    SearchPage,
    MainLanguagePage,
    WelcomePage,
    CarDetailsPage,
    ReserveInfoPage,
    ReserveSuccessPage,
    OrderStatusPage,
    FaqPage,
    LangModlePage,
    ViewCarsPage,
    PoliciesPage,
    SelectPage,
    SelectModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      backButtonText: "",
      ModalsDismissOnSubPages: true
    }),
    IonicImageViewerModule,
    ionicGalleryModal.GalleryModalModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CarsPage,
    FollowOrderPage,
    MorePage,
    SearchPage,
    MainLanguagePage,
    WelcomePage,
    CarDetailsPage,
    ReserveInfoPage,
    ReserveSuccessPage,
    OrderStatusPage,
    FaqPage,
    LangModlePage,
    ViewCarsPage,
    PoliciesPage,
    SelectPage,
    SelectModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    CallNumber,
    InAppBrowser,
    Geolocation,
    Network,
    OneSignal,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HAMMER_GESTURE_CONFIG, useClass: ionicGalleryModal.GalleryModalHammerConfig },
    MsgProvider
  ]
})
export class AppModule {}
