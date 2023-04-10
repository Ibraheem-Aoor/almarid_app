import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { CallNumber } from "@ionic-native/call-number";
import { InAppBrowser } from "@ionic-native/in-app-browser";
@Component({
  selector: "page-order-status",
  templateUrl: "order-status.html"
})
export class OrderStatusPage {
  lang: string = window.localStorage.getItem("lang");
  number;
  process: number = 1;
  name = "حالة الطلب";
  image = "assets/imgs/order3.png";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private callNumber: CallNumber,
    private iab: InAppBrowser
  ) {
    this.number = navParams.get("number");
    this.process = navParams.get("sort");
    this.name = navParams.get("name");
    this.image = navParams.get("img");
    console.log("process : " + this.process);
    console.log("status : " + this.name);
    console.log("image source : " + this.image);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OrderStatusPage");
  }

  call() {
    let number = window.localStorage.getItem("whatsapp");
    this.callNumber
      .callNumber(number, true)
      .then(res => console.log("Launched dialer!", res))
      .catch(err => console.log("Error launching dialer", err));
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
