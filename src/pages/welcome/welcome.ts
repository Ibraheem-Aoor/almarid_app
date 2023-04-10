import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { MsgProvider } from "../../providers/msg/msg";

@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html"
})
export class WelcomePage {
  lang = window.localStorage.getItem("lang");
  image: any = [];
  title: any = [];
  text: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public msg: MsgProvider
  ) {
    this.getDate();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad WelcomePage");
  }

  getDate() {
    //get Image
    this.msg.settings("splash_image").subscribe(
      data => {
        console.log("image = ");
        console.log(data);
        this.image = data.settings[0].value;
      },
      error => {
        console.log(error);
      }
    );

    if (this.lang == "ar") {
      //get Title
      this.msg.settings("splash_title").subscribe(
        data => {
          console.log("title = ");
          console.log(data);
          this.title = data.settings[0].value;
        },
        error => {
          console.log(error);
        }
      );
      //get Text
      this.msg.settings("splash_text").subscribe(
        data => {
          console.log("text = ");
          console.log(data);
          this.text = data.settings[0].value;
        },
        error => {
          console.log(error);
        }
      );
    } else if (this.lang == "en") {
      //get Title
      this.msg.settings("splash_en_title").subscribe(
        data => {
          console.log("title = ");
          console.log(data);
          this.title = data.settings[0].value;
        },
        error => {
          console.log(error);
        }
      );
      //get Text
      this.msg.settings("splash_en_text").subscribe(
        data => {
          console.log("text = ");
          console.log(data);
          this.text = data.settings[0].value;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  goToTabs() {
    this.navCtrl.setRoot(TabsPage);
    // location.reload();
    window.localStorage.setItem("page", "home");
  }
}
