import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { FollowOrderPage } from "../follow-order/follow-order";
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: "page-reserve-success",
  templateUrl: "reserve-success.html"
})
export class ReserveSuccessPage {
  lang: string = "ar";
  number;
  name;
  image;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.number = navParams.get("number");
    this.name = navParams.get("name");
    this.image = navParams.get("image");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReserveSuccessPage");
    this.lang = localStorage.getItem("lang");
  }

  goToOrder() {
    this.navCtrl.setRoot(FollowOrderPage);
  }
  goToMain() {
    this.navCtrl.setRoot(TabsPage);
  }
}
