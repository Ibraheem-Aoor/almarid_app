import { Component } from "@angular/core";
import {
  Platform,
  NavController,
  NavParams,
  AlertController,
  ViewController
} from "ionic-angular";
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: "page-lang-modle",
  templateUrl: "lang-modle.html"
})
export class LangModlePage {
  language: string = "ar";
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LangModlePage");
    this.language = window.localStorage.getItem("lang");
  }

  chooseArabic() {
    this.platform.setDir("rtl", true);
    window.localStorage.setItem("lang", "ar");
    this.dismiss();
    this.navCtrl.setRoot(TabsPage);
    //window.location.reload();
  }

  chooseEnglish() {
    this.platform.setDir("ltr", true);
    window.localStorage.setItem("lang", "en");
    this.dismiss();
    this.navCtrl.setRoot(TabsPage);
    //window.location.reload();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
