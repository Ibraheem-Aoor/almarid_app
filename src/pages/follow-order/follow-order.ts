import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { OrderStatusPage } from "../order-status/order-status";
import { MsgProvider } from "../../providers/msg/msg";

@Component({
  selector: "page-follow-order",
  templateUrl: "follow-order.html"
})
export class FollowOrderPage {
  lang: string = "ar";
  tracking: any;
  email: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public msg: MsgProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad FollowOrderPage");
    this.lang = window.localStorage.getItem("lang");
  }

  orderStatus() {
    let loader = this.loadingCtrl.create({
      content: ""
    });
    loader.present();
    this.msg.tracking(this.tracking, this.email).subscribe(
      data => {
        loader.dismiss();
        console.log(data);
        if (data.success) {
          this.navCtrl.push(OrderStatusPage, {
            number: this.tracking,
            name: data.tracking[0].name,
            img: data.tracking[0].image,
            sort: data.tracking[0].sort
          });
        } else {
          console.log(data.message);

          if(data.message == 'Enter Valid Data'){
            if (this.lang == "en") {
              let alert = this.alertCtrl.create({
                title: "Error",
                subTitle: "Enter Valid Data",
                buttons: ["OK"]
              });
              alert.present();
            } else {
              let alert = this.alertCtrl.create({
                title: "خطأ",
                subTitle: "أدخل بيانات صحيحة",
                buttons: ["تم"]
              });
              alert.present();
            }
          }else {
            if (this.lang == "en") {
              let alert = this.alertCtrl.create({
                title: "Error",
                subTitle:"The request is in progress",
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
        }
      },
      error => {
        loader.dismiss();
        console.log(error);
      }
    );
  }
}
