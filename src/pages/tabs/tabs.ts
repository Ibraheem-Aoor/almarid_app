import { Component } from "@angular/core";
import { ModalController, Modal } from "ionic-angular";
import { HomePage } from "../home/home";
import { CarsPage } from "../cars/cars";
import { FollowOrderPage } from "../follow-order/follow-order";
import { MorePage } from "../more/more";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = CarsPage;
  tab3Root;
  tab4Root = FollowOrderPage;

  root1: string = "الرئيسية";
  root2: string = "سيارات";
  root3: string = "المزيد";
  root4: string = "تتبع طلبك";
  lang = window.localStorage.getItem("lang");
  type = localStorage.getItem('type');
  icon2 = 'car'
  constructor(public modalCtrl: ModalController) {
    if(this.type == 'a'){
      this.root2 = 'الاكسسوارات';
      this.icon2 = 'color-wand';
    }
    if (this.lang == "en") {
      this.root1 = "Home";
      this.root2 = "Cars";
      this.root3 = "More";
      this.root4 = "Trace Order";
      if(this.type == 'a'){
        this.root2 = 'Accessories';
      }
    }
  }

  morePage() {
    const modalOpts = { showBackdrop: true, enableBackdropDismiss: true };
    let moreModal: Modal = this.modalCtrl.create(
      MorePage,
      { data: "data" },
      modalOpts
    );
    moreModal.present();
  }
}
