import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  ToastController
} from "ionic-angular";
import { SearchPage } from "../search/search";
import { MsgProvider } from "../../providers/msg/msg";
import { CarDetailsPage } from "../car-details/car-details";
import { Storage } from '@ionic/storage';

@Component({
  selector: "page-cars",
  templateUrl: "cars.html"
})
export class CarsPage {
  lang: string = "ar";
  content = "جار التحميل ...";
  coin = "درهم";
  cars: any = [];
  type = window.localStorage.getItem('type');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public msg: MsgProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public storage: Storage
  ) {
    if(this.type == 'a'){
      this.getAccessories();
    }else{
      this.getCars();
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CarsPage");
    this.lang = window.localStorage.getItem("lang");
    if (this.lang == "en") {
      this.content = "Please wait ...";
      this.coin = "AED";
    }
  }

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);
    if(this.type == 'a'){
      this.getAccessories();
    }else{
      this.getCars();
    }
    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
    }, 2000);
  }

  goToSearch() {
    this.navCtrl.push(SearchPage);
  }

  getAccessories() {
    let loader = this.loadingCtrl.create({
      content: this.content
    });
    loader.present();
    this.msg.accessories('2','2','','','').subscribe( data => {
      loader.dismiss();
      console.log(data);
      this.cars = data.accessories;
    }, error => {
      loader.dismiss();
      console.log(error);

    })
  }

  getCars() {
    let loader = this.loadingCtrl.create({
      content: this.content
    });
    loader.present();
    this.msg
      .cars("", "", "", "", "", "", "", "2", "", "", "", "2", "", "")
      .subscribe(
        data => {
          loader.dismiss();
          console.log(data);
          this.cars = data.cars;
          this.storage.set('cars', JSON.stringify(this.cars));
          if (this.cars.length == 0) {
            let alert = this.alertCtrl.create({
              title: "لا يوجد سيارات",
              subTitle: "للأسف، لا يوجد سيارات حالياً في المتجر",
              buttons: ["تم"]
            });
            alert.present();
          }
        },
        error => {
          loader.dismiss();
          this.storage.get('cars').then( res => {
            if(res != null && res != undefined){
              this.cars = JSON.parse(res);
            }
          });
          console.error(error);
          var msg = "يرجى التأكد من الاتصال بالانترنت";
          if (this.lang == "en") {
            msg = "Check your internet conncetion";
          }
          let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: "bottom"
          });
          toast.present();
        }
      );
  }

  goToDetails(id, image) {
    this.navCtrl.push(CarDetailsPage, {
      id: id,
      image: image
    });
  }
}
