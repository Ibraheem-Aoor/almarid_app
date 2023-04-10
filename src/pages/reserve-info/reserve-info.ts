import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { ReserveSuccessPage } from "../reserve-success/reserve-success";
import { Geolocation } from "@ionic-native/geolocation";
import { MsgProvider } from "../../providers/msg/msg";
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from "@ionic-native/in-app-browser";

declare let google;
@Component({
  selector: "page-reserve-info",
  templateUrl: "reserve-info.html"
})
export class ReserveInfoPage {
  showWait = true;
  lang: string = "ar";
  content = "جار التحميل ...";
  contentMap = "تحميل الخريطة ...";
  viewMap = false;
  @ViewChild("map") mapElement: ElementRef;
  map: any;
  process: number = 1;
  name: string = "";
  lname: string = "";
  email: string = "";
  phone: string = "";
  address: string = "";
  lat: any;
  lng: any;
  car_id: any;
  car_color: any;
  car_name: any;
  car_deposit: any;
  image: any;
  coin = "درهم";
  result = {
    number: "",
    url: "",
    image: "",
    name: ''
  };
  order : any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public msg: MsgProvider,
    public sanitizer: DomSanitizer,
    public iab: InAppBrowser
  ) {
    this.car_id = navParams.get("id");
    this.car_color = navParams.get("color");
    this.car_name = navParams.get("name");
    this.car_deposit = navParams.get("deposit");
    this.image = navParams.get("image");
    console.log("deposit = " + this.car_deposit);


  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReserveInfoPage");
    this.lang = window.localStorage.getItem("lang");
    if (this.lang == "en") {
      this.content = "Loading ...";
      this.contentMap = "Loading Map ...";
      this.coin = "AED";
    }
  }



  goToInfo() {
    this.process = 1;
  }

  goToCar() {
    if (
      this.name == "" ||
      this.lname == "" ||
      this.email == "" ||
      this.phone == "" ||
      this.address == ""
    ) {
      if (this.lang == "en") {
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: "You have to fill all required fields",
          buttons: ["OK"]
        });
        alert.present();
      } else {
        let alert = this.alertCtrl.create({
          title: "خطأ",
          subTitle: "يجب تعبئة جميع الحقول المطلوبة",
          buttons: ["تم"]
        });
        alert.present();
      }
    } else {
      this.process = 2;
    }
  }
  goToPay() {
    this.process = 3;
  }

  getOrderDetails(){
    let loader = this.loadingCtrl.create({
      content: this.content
    });
    loader.present();
    this.msg
    .order(
      this.name,
      this.lname,
      this.phone,
      this.email,
      this.address,
      this.lat,
      this.lng,
      this.car_id,
      this.car_color
    )
    .subscribe(
      data => {
        console.log(data);

        if (data.success) {
          this.result.url = data.payment_url;
          this.result.number = data.extra;
          this.result.name = this.car_name;
          this.result.image = this.image;
          // go To Paytabs Page
          setTimeout(() => {
            this.showWait= false;
            this.payNow();
          },2000)
          let interval = setInterval(() => {
            this.msg.tracking(this.result.number, this.email).subscribe(data => {
              this.order = data.tracking[1];
              console.log('order = ');
              console.log(this.order.order);
              if(this.order.order.is_paid == '1'){
                clearInterval(interval);
                this.getOrder();
              }
            })
          }, 10000);
        } else {
          if (this.lang == "en") {
            let alert = this.alertCtrl.create({
              title: "Error",
              subTitle: data.message,
              buttons: ["OK"]
            });
            alert.present();
          } else {
            let alert = this.alertCtrl.create({
              title: "خطأ",
              subTitle: data.message,
              buttons: ["تم"]
            });
            alert.present();
          }
        }
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        console.error(error);
      }
    );
  }
  goToSuccess() {
    this.getOrderDetails();

  }

  checkTracking(){
    this.msg.tracking(this.result.number, this.email).subscribe(data => {
      this.order = data.tracking[1];
      console.log('order = ');
      console.log(this.order.order);

      if(this.order.order.is_paid == '1'){

        this.getOrder();
      }
    })
  }

  payNow(){
    this.iab.create(
      "https://almaridcars.com/almarid/public/api/orders/pay_page/"+ this.result.number,
      "_self"
    )
  }


  getOrder() {
    this.navCtrl.push(ReserveSuccessPage, {
      number: this.result.number,
      name: this.car_name,
      image: this.image
    });
  }

  loadMap() {
    this.viewMap = true;
    let loader = this.loadingCtrl.create({
      content: this.contentMap,
      dismissOnPageChange: true
    });
    loader.present();

    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        loader.dismiss();
        var latlong = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        var options = {
          center: latlong,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, options);
        var marker = new google.maps.Marker({
          position: this.map.getCenter(),
          animation: google.maps.Animation.DROP,
          draggable: true,
          map: this.map
        });
        this.addNewMaker(marker);
      })
      .catch(error => {
        loader.dismiss();
        console.log("Error getting location", error);
      });
  }
  addNewMaker(marker) {
    google.maps.event.addListener(marker, "dragend", function() {
      this.markerlatlong = marker.getPosition();

      console.log("latlong   " + this.markerlatlong);
      console.log("lat    " + marker.getPosition().lat());
      console.log("long   " + marker.getPosition().lng());
      this.lat = marker.getPosition().lat();
      this.lng = marker.getPosition().lng();
    });
  }
}
