import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { MsgProvider } from "../../providers/msg/msg";

@Component({
  selector: "page-policies",
  templateUrl: "policies.html"
})
export class PoliciesPage {
  content : any;
  lang = window.localStorage.getItem('lang');
  constructor(public navCtrl: NavController, public navParams: NavParams, public msg: MsgProvider, public loadingCtrl: LoadingController) {
    this.getPolicies();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PoliciesPage");
  }

  getPolicies(){
    let loader = this.loadingCtrl.create({
      content: ""
    });
    loader.present();
    this.msg.pages('','','','2',this.lang).subscribe(data => {
      loader.dismiss();
      console.log(data);
      this.content = data.pages[0].text;
    }, error => {
      console.error(error);
      loader.dismiss();
    });
  }
}
