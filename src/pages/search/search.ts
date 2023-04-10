import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { MsgProvider } from "../../providers/msg/msg";
import { ViewCarsPage } from "../view-cars/view-cars";

@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {
  type = localStorage.getItem('type');
  lang: string = "ar";
  price: any;
  minPrice: any;
  maxPrice: any;
  cars: any = [];
  options: any = [];
  brands: any = [];
  models: any = [];

  brand: any = "";
  car: any = "";
  option: any = "";
  model: any = "";
  name: any = "";
  structure = {lower: null, upper: null};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public msg: MsgProvider
  ) {
    this.getMinPrice();
    this.getMaxPrice();
    if(this.type == 'a'){
      this.getAccessorisCat();
    }else {
      this.getCategories();
      this.getOptions();
      this.getModels();
      this.getBrands();
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SearchPage");
    this.lang = window.localStorage.getItem("lang");
  }
  getMinPrice() {
    this.msg.settings("min_price").subscribe(
      data => {
        console.log(data);
        this.minPrice = data.settings[0].value;
        this.structure.lower = this.minPrice;
      },
      error => {
        console.error(error);
      }
    );
  }
  getMaxPrice() {
    this.msg.settings("max_price").subscribe(
      data => {
        console.log(data);
        this.maxPrice = data.settings[0].value;
        this.price = data.settings[0].value;
        this.structure.upper = this.maxPrice;
      },
      error => {
        console.error(error);
      }
    );
  }
  getCategories() {
    this.msg.categories("", "", "", "", "car").subscribe(
      data => {
        console.log(data);
        this.cars = data.categories;
      },
      error => {
        console.error(error);
      }
    );
  }
  getAccessorisCat() {
    this.msg.categories('','','','','').subscribe(
      data => {
        console.log(data);
        data.categories.map(element => {
          if(element.type == 'ACCESSORY'){
            this.cars.push(element);
          }
        })

      }
    )
  }
  getOptions() {
    this.msg.options("", "", "", "", "22").subscribe(
      data => {
        console.log(data);
        this.options = data.options;
      },
      error => {
        console.error(error);
      }
    );
  }
  getBrands() {
    this.msg.brands("", "", "", "").subscribe(
      data => {
        console.log(data);
        this.brands = data.brands;
      },
      error => {
        console.error(error);
      }
    );
  }
  getModels() {
    this.msg.models("", "", "", "").subscribe(
      data => {
        console.log(data);
        this.models = data.models;
      },
      error => {
        console.error(error);
      }
    );
  }
  carSelect(id) {
    if (id == this.car) {
      this.car = "";
      console.log("null car = " + this.car);
    } else {
      this.car = id;
      console.log("car = " + this.car);
    }
  }
  optionSelect(id) {
    if (id == this.option) {
      this.option = "";
      console.log("null option = " + this.option);
    } else {
      this.option = id;
      console.log("option = " + this.option);
    }
  }
  modelSelect(id) {
    if (id == this.model) {
      this.model = "";
      console.log("null model = " + this.model);
    } else {
      this.model = id;
      console.log("model = " + this.model);
    }
  }
  brandSelect(id) {
    if (id == this.brand) {
      this.brand = "";
      console.log("null brand = " + this.brand);
    } else {
      this.brand = id;
      console.log("brand = " + this.brand);
    }
  }
  search() {
    this.navCtrl.push(ViewCarsPage, {
      from: "search",
      name: this.name,
      minPrice: this.structure.lower,
      maxPrice: this.structure.upper,
      car: this.car,
      option: this.option,
      model: this.model,
      brand: this.brand
    });
  }
}
