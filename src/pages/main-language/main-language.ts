import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  Platform
} from "ionic-angular";
import { SelectPage } from "../select/select";

@Component({
  selector: "page-main-language",
  templateUrl: "main-language.html"
})
export class MainLanguagePage {
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MainLanguagePage");
  }

  chooseArabic() {
    this.platform.setDir("rtl", true);
    window.localStorage.setItem("lang", "ar");
    this.navCtrl.setRoot(SelectPage);
  }

  chooseEnglish() {
    this.platform.setDir("ltr", true);
    window.localStorage.setItem("lang", "en");
    this.navCtrl.setRoot(SelectPage);
  }
}
