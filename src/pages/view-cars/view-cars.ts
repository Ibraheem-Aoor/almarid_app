import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { MsgProvider } from "../../providers/msg/msg";
import { CarDetailsPage } from "../car-details/car-details";
import { Storage } from '@ionic/storage';

@Component({
  selector: "page-view-cars",
  templateUrl: "view-cars.html"
})
export class ViewCarsPage {
  tp = localStorage.getItem('type');
  lang: string = "ar";
  content = "جار التحميل ...";
  cars: any = [];
  accessories: any = [];
  showSorry = false;
  // from Home page
  type: string;
  value: string;
  // real params
  id: any = "";
  pagination: any = "";
  limit: any = "";
  page: any = "";
  category_id: any = "";
  model_id: any = "";
  brand_id: any = "";
  is_new: any = "2";
  min_price: any = "";
  max_price: any = "";
  option_id: any = "";
  is_offer: any = "2";
  with_relation: any = "";
  name: any = "";
  coin = "درهم";
  // test

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public msg: MsgProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {
    // for home page
    this.type = navParams.get("type");
    this.value = navParams.get("value");
    console.log("type = " + this.type);
    console.log("value = " + this.value);
    this.lang = window.localStorage.getItem("lang");
    if (this.lang == "en") {
      this.content = "Please wait ...";
      this.coin = "AED";
    }
    // from home page

    if (this.type == "offers") {
      this.is_offer = "1";
    } else if (this.type == "latest") {
      this.is_new = "1";
    } else if (this.type == "mod") {
      this.model_id = this.value;
    } else if (this.type == "com") {
      this.brand_id = this.value;
    } else if (this.type == "cat") {
      this.category_id = this.value;
    }

    // for search page
    if (navParams.get("from") == "search") {
      this.name = navParams.get("name");
      this.min_price = navParams.get("minPrice");
      this.max_price = navParams.get("maxPrice");
      this.category_id = navParams.get("car");
      this.option_id = navParams.get("option");
      this.model_id = navParams.get("model");
      this.brand_id = navParams.get("brand");
    }
    if(this.tp != 'a'){
      this.getCars(
        this.id,
        this.pagination,
        this.limit,
        this.page,
        this.category_id,
        this.model_id,
        this.brand_id,
        this.is_new,
        this.min_price,
        this.max_price,
        this.option_id,
        this.is_offer,
        this.with_relation,
        this.name
      );
    }
    else{
      this.getAccessories();
    }

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ViewCarsPage");
  }

  getAccessories(){
    let loader = this.loadingCtrl.create({
      content: this.content
    });
    loader.present();
    this.msg.accessories(this.is_new,this.is_offer, this.min_price, this.max_price, this.name).subscribe(data => {
      loader.dismiss();
      console.log(data);
      this.accessories = data.accessories;
      if (this.accessories.length == 0) {
        this.showSorry = true;
      }
    }, error => {
      console.error(error);
    })
  }

  getCars(
    id,
    pagination,
    limit,
    page,
    category_id,
    model_id,
    brand_id,
    is_new,
    min_price,
    max_price,
    option_id,
    is_offer,
    with_relation,
    name
  ) {
    let loader = this.loadingCtrl.create({
      content: this.content
    });
    loader.present();
    this.msg
      .cars(
        id,
        pagination,
        limit,
        page,
        category_id,
        model_id,
        brand_id,
        is_new,
        min_price,
        max_price,
        option_id,
        is_offer,
        with_relation,
        name
      )
      .subscribe(
        data => {
          loader.dismiss();
          console.log(data);
          this.cars = data.cars;
          if (this.cars.length == 0) {
            this.showSorry = true;
          }
          this.storage.set('viewcars'+model_id+"b"+brand_id+"c"+category_id, JSON.stringify(this.cars));
        },
        error => {
          loader.dismiss();
          this.storage.get('viewcars'+model_id+"b"+brand_id+"c"+category_id).then( res => {
            if(res != null && res != undefined){
              this.cars = JSON.parse(res);
              if (this.cars.length == 0) {
                this.showSorry = true;
              }
            }
          });
          console.error(error);
        }
      );
  }
  goToDetails(id, image) {
    this.navCtrl.push(CarDetailsPage, {
      id: id,
      image: image
    });
  }
}
