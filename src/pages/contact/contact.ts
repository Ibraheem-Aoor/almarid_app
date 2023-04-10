import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { MsgProvider } from "../../providers/msg/msg";
import { InAppBrowser } from "@ionic-native/in-app-browser";
declare let google;

@Component({
  selector: "page-contact",
  templateUrl: "contact.html"
})
export class ContactPage {
  @ViewChild("map") mapElement: ElementRef;
  map: any;
  lat = "25.343187";
  lng = "55.478212";
  lang: string = "ar";
  content = "جار التحميل ...";
  contentMap = "تحميل الخريطة ...";
  settings: any = [];
  facebook: string;
  twitter: string;
  instagram: string;
  phone: string;
  email: string;
  times: string;
  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public msg: MsgProvider,
    public loadingCtrl: LoadingController,
    public iab: InAppBrowser
  ) {
    this.lang = window.localStorage.getItem("lang");
    if (this.lang == "en") {
      this.content = "Loading ...";
      this.contentMap = "Loading Map ...";
    }
    this.getData();
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  openBrowser(url: string) {
    this.iab.create(url, "_system");
  }

  loadMap() {
    // let loader = this.loadingCtrl.create({
    //   content: this.contentMap,
    //   dismissOnPageChange: true
    // });
    // loader.present();
    this.geolocation
      .getCurrentPosition()
      .then(() => {
        // loader.dismiss();
        var latlong = new google.maps.LatLng(this.lat, this.lng);
        var options = {
          center: latlong,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, options);
        new google.maps.Marker({
          position: latlong,
          map: this.map,
          label: "Almared Motors"
        });
      })
      .catch(error => {
        // loader.dismiss();
        console.log("Error getting location", error);
      });
  }

  getData() {
    let loader = this.loadingCtrl.create({
      content: this.content
    });
    loader.present();
    this.msg.settings("").subscribe(
      data => {
        loader.dismiss();
        this.settings = data.settings;
        for (let set of this.settings) {
          if (set.key == "facebook") {
            this.facebook = set.value;
          } else if (set.key == "twitter") {
            this.twitter = set.value;
          } else if (set.key == "instagram") {
            this.instagram = set.value;
          } else if (set.key == "phone") {
            this.phone = set.value;
          } else if (set.key == "email") {
            this.email = set.value;
          } else if (set.key == "working_time") {
            this.times = set.value;
          }
        }
      },
      error => {
        loader.dismiss();
        console.error(error);
      }
    );
  }
  contactWhatsApp() {
    let whats = window.localStorage.getItem("whatsapp");
    const whatsApp = this.iab.create(
      "https://api.whatsapp.com/send?phone=" + whats,
      "_system"
    );
    console.log(whatsApp);
  }
}
