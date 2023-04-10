import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ViewController,
  ModalController,
  Modal,
  Platform
} from "ionic-angular";
import { FaqPage } from "../faq/faq";
import { ContactPage } from "../contact/contact";
import { LangModlePage } from "../lang-modle/lang-modle";
import { SocialSharing } from "@ionic-native/social-sharing";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { PoliciesPage } from "../policies/policies";
import { SelectModalPage } from "../select-modal/select-modal";

@Component({
  selector: "page-more",
  templateUrl: "more.html"
})
export class MorePage {
  lang: string = "ar";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private socialSharing: SocialSharing,
    private iab: InAppBrowser,
    private plt: Platform
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MorePage");
    this.lang = window.localStorage.getItem("lang");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  goToFAQ() {
    this.navCtrl.push(FaqPage);
  }

  goToContact() {
    this.navCtrl.push(ContactPage);
  }

  goToPolitics() {
    this.navCtrl.push(PoliciesPage);
  }

  goTolangModel() {
    this.dismiss();
    const modalOpts = { showBackdrop: true, enableBackdropDismiss: true };
    let langeModal: Modal = this.modalCtrl.create(LangModlePage, {}, modalOpts);
    langeModal.present();
  }
  goToSectionModal(){
    this.dismiss();
    const modalOpts = { showBackdrop: true, enableBackdropDismiss: true };
    let sectionMod: Modal = this.modalCtrl.create(SelectModalPage , {}, modalOpts);
    sectionMod.present();
  }

  shareApp() {
    let url = '';
    if(this.plt.is('ios')){
      url = localStorage.getItem("apple_store");
    }else {
      url = localStorage.getItem("google_play");
    }
    this.socialSharing.share(url, "", "", "").then(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
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
