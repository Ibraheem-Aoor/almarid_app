import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-select',
  templateUrl: 'select.html',
})
export class SelectPage {
  lang = window.localStorage.getItem("lang");
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPage');
  }

  goToWelcome(type){
    localStorage.setItem('type',type);
    if(localStorage.getItem('page') != "home"){
      this.navCtrl.setRoot(WelcomePage);
    }else {
      this.navCtrl.setRoot(TabsPage);
    }

  }

}
