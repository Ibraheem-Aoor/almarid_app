import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from "ionic-angular";
import { CarDetailsPage } from "../car-details/car-details";
import { SearchPage } from "../search/search";
import { MsgProvider } from "../../providers/msg/msg";
import { ViewCarsPage } from "../view-cars/view-cars";
import { Storage } from '@ionic/storage';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  lang: string = "ar";
  content = "الرجاء الإنتظار ....";
  slides: any = [];
  carSlides: any = [];
  accessorySlides: any = [];
  items: any = [];
  coin = "درهم";
  type = localStorage.getItem('type');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public msg: MsgProvider,
    public storage: Storage
  ) {
    // call functions
    this.lang = window.localStorage.getItem("lang");
    if (this.lang == "en") {
      this.content = "Please Wait ....";
      this.coin = "AED";
    }
    this.home();
    this.sliders();
    this.settings();
  }

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);
    this.home();
    this.sliders();
    this.settings();
    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
    }, 2000);
  }

  home() {
    let loader = this.loadingCtrl.create({
      content: this.content
    });
    loader.present();
    this.msg.home().subscribe(
      data => {
        loader.dismiss();
        console.log(data);
        this.items = data;
        this.storage.set('home', JSON.stringify(this.items));
      },
      error => {
        loader.dismiss();
        this.storage.get('home').then( res => {
          if(res != null && res != undefined){
            this.items = JSON.parse(res);
          }
        });
        console.log(error);
      }
    );
  }

  sliders() {
    this.carSlides = [];
    this.accessorySlides = [];
    let loader = this.loadingCtrl.create({
      content: this.content
    });
    loader.present();
    this.msg.sliders(this.lang).subscribe(
      data => {
        loader.dismiss();
        console.log(data);
        this.slides = data.sliders;
        this.slides.map(element => {
          if(element.type == 'CAR'){
            this.carSlides.push(element);
          }else {
            this.accessorySlides.push(element);
          }
        })
        this.storage.set('slides', JSON.stringify(this.slides));
      },
      error => {
        this.storage.get('slides').then( res => {
          if(res != null && res != undefined){
            this.slides = JSON.parse(res);
          }
        });
        loader.dismiss();
        console.log(error);
      }
    );
  }

  goToDetails(id, image) {
    this.navCtrl.push(CarDetailsPage, {
      id: id,
      image: image
    });
  }

  goToSearch() {
    this.navCtrl.push(SearchPage);
  }

  goToCars(type, value) {
      this.navCtrl.push(ViewCarsPage, {
        type: type,
        value: value
      });
  }

  // get Settings
  settings() {
    this.msg.settings("").subscribe(data => {
      console.log(data);
      for (let key of data.settings) {
        if (key.key == "whatsapp") {
          window.localStorage.setItem("whatsapp", key.value);
        } else if (key.key == "phone") {
          window.localStorage.setItem("phone", key.value);
        }
        else if (key.key == "google_play") {
          window.localStorage.setItem("google_play", key.value);
        }
        else if (key.key == "apple_store") {
          window.localStorage.setItem("apple_store", key.value);
        }
      }
    });
  }
}
