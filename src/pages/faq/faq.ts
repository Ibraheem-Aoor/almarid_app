import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { MsgProvider } from "../../providers/msg/msg";
import { InAppBrowser } from "@ionic-native/in-app-browser";

@Component({
  selector: "page-faq",
  templateUrl: "faq.html"
})
export class FaqPage {
  lang: string = "ar";
  content = "جار التحميل ...";
  section = "guides";
  faqs = "all";
  showDetails: boolean;
  shownGroup = null;
  faqCats: any = [];
  guideitems: any = [];
  faqsitem: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public msg: MsgProvider,
    public loadingCtrl: LoadingController,
    private iab: InAppBrowser
  ) {
    this.lang = window.localStorage.getItem("lang");
    if (this.lang == "en") {
      this.content = "Loading";
    }
    this.getFaqCat();
    this.getGuides();
    this.getFaqs();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad FaqPage");
  }

  getFaqs() {
    let loader = this.loadingCtrl.create({
      content: this.content
    });
    loader.present();
    this.msg.faq("", "", "", "", this.lang, "").subscribe(
      data => {
        loader.dismiss();
        console.log(data);
        this.faqsitem = data.faqs;
      },
      error => {
        loader.dismiss();
        console.error(error);
      }
    );
  }

  getFaqCat() {
    let loader = this.loadingCtrl.create({
      content: this.content
    });
    loader.present();
    this.msg.categories("", "", "", "", "faq").subscribe(
      data => {
        loader.dismiss();
        console.log(data);
        this.faqCats = data.categories;
      },
      error => {
        loader.dismiss();
        console.error(error);
      }
    );
  }

  getGuides() {
    let loader = this.loadingCtrl.create({
      content: this.content
    });
    loader.present();
    this.msg.guides("", "", "", "", this.lang).subscribe(
      data => {
        loader.dismiss();
        console.log(data);
        this.guideitems = data.guides;
      },
      error => {
        loader.dismiss();
        console.error(error);
      }
    );
  }

  goToYoutube(url) {
    this.iab.create(url, "_system");
  }

  toggleDetails() {
    if (this.showDetails) {
      this.showDetails = false;
      // data.icon = 'ios-add-circle-outline';
    } else {
      this.showDetails = true;
      // data.icon = 'ios-remove-circle-outline';
    }
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  }
}
