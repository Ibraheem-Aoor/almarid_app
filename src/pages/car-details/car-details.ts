import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  ViewController,
  ModalController,
  ToastController
} from "ionic-angular";
import { ReserveInfoPage } from "../reserve-info/reserve-info";
import { SocialSharing } from "@ionic-native/social-sharing";
import { MsgProvider } from "../../providers/msg/msg";
import { GalleryModal } from 'ionic-gallery-modal';
import { Storage } from '@ionic/storage';

@Component({
  selector: "page-car-details",
  templateUrl: "car-details.html"
})
export class CarDetailsPage {
  type = localStorage.getItem('type');
  lang: string = "ar";
  id;
  cars: any = [];
  car: any;
  color: any;
  deposit: any;
  content = "جار التحميل ...";
  name: string;
  options: any = [];
  carImage: any;
  coin = "درهم";
  images :any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private socialSharing: SocialSharing,
    public msg: MsgProvider,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public modalController: ModalController,
    private toastCtrl: ToastController,
    public storage: Storage
  ) {
    this.carImage = navParams.get("image");
    this.id = navParams.get("id");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CarDetailsPage");
    console.log("id = " + this.id);
    this.lang = window.localStorage.getItem("lang");
    if (this.lang == "en") {
      this.content = "Please wait ...";
      this.coin = "AED";
    }
    if(this.type != 'a'){
      this.getCar(this.id);
    }else {
      this.getAccessory(this.id);
    }
  }

  getAccessory(id){
    let loader = this.loadingCtrl.create({
      content: this.content
    });
    loader.present();
    this.msg.getAccessories(id).subscribe( data => {
      loader.dismiss();
      console.log(data);
      this.cars = data.accessories;
      this.car = this.cars[0];
      if (this.lang == "ar") {
        this.name = this.car.name;
      } else {
        this.name = this.car.name_en;
      }
      this.deposit = this.car.deposit;
      for(let img of this.car.images){
        this.images.push({
          url : img.image
        });
      }
    }, error => {
      loader.dismiss();
      console.error(error);

    })
  }
  getCar(id) {
    let loader = this.loadingCtrl.create({
      content: this.content
    });
    loader.present();
    this.msg
      .cars(id, "", "", "", "", "", "", "", "", "", "", "", "", "")
      .subscribe(
        data => {
          loader.dismiss();
          //console.log(data);
          this.cars = data.cars;
          console.log(this.cars);
          this.car = this.cars[0];
          this.storage.set('car'+id, JSON.stringify(this.car));
          if (this.lang == "ar") {
            this.name = this.car.name;
          } else {
            this.name = this.car.name_en;
          }
          this.deposit = this.car.deposit;
          for(let img of this.car.images){
            this.images.push({
              url : img.image
            });
          }
        },
        error => {
          loader.dismiss();
          this.storage.get('car'+id).then( res => {
            if(res != null && res != undefined){
              this.car = JSON.parse(res);
            }
          });
          console.error(error);
        }
      );
  }

  openGallery(index){
    console.log('gallery');
    let modalOpts = {
      cssClass: 'gallery-modal'
    }
    let modal = this.modalController.create(GalleryModal,{
      photos: this.images,
      initialSlide: index,
      closeIcon: 'close'
    }, modalOpts);
    modal.present();
  }

  goToReserve(quantity) {
    if (quantity == 0){
      if(this.lang == 'en'){
        let toast = this.toastCtrl.create({
          message: 'Sorry .. Out of stock',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      else {
        let toast = this.toastCtrl.create({
          message: 'نأسف .. نفذت الكمية',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }

    }
    else{
      this.navCtrl.push(ReserveInfoPage, {
        id: this.id,
        color: this.color,
        name: this.name,
        deposit: this.deposit,
        image: this.carImage
      });
    }

  }

  getOptions() {
    let loader = this.loadingCtrl.create({
      content: this.content
    });
    loader.present();
    this.msg.categories("", "", "", "", "options").subscribe(
      data => {
        loader.dismiss();
        console.log(data);
        this.options = data.categories;
        this.storage.set('caroptions', JSON.stringify(this.options));
      },
      error => {
        loader.dismiss();
        this.storage.get('caroptions').then( res => {
          if(res != null && res != undefined){
            this.options = JSON.parse(res);
          }
        });
        console.error(error);
      }
    );
  }

  share(msg: string, subject: string, file: string, link: string) {
    this.socialSharing.share(msg, subject, file, link).then(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
