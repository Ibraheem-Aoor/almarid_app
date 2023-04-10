import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-select-modal',
  templateUrl: 'select-modal.html',
})
export class SelectModalPage {
  lang = window.localStorage.getItem("lang");
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseSection(type){
    localStorage.setItem('type',type)
    this.navCtrl.setRoot(TabsPage);
    // location.reload();
  }

}
