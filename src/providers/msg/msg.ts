import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs";
@Injectable()
export class MsgProvider {
  //private url =
   // "https://cors-anywhere.herokuapp.com/http://almaridcars.com/almarid/public/api";
  private url = "https://almaridcars.com/almarid/public/api";
  constructor(public http: Http) {
    console.log("Hello MsgProvider Provider");
  }

  // Home Data
  home() {
    return this.http
      .get(this.url + "/home")
      .do((res: Response) => console.log("Results of Home : " + res))
      .map((res: Response) => res.json())
      .catch(this.catchError);
  }

  // Slider Data
  sliders(lang) {
    return this.http
      .get(this.url + "/sliders?lang=" + lang)
      .do((res: Response) => console.log("Results of Sliders : " + res))
      .map((res: Response) => res.json())
      .catch(this.catchError);
  }

  // Brands Data
  brands(id, pagination, limit, page) {
    return this.http
      .get(
        this.url +
          "/brands?id=" +
          id +
          "&pagination=" +
          pagination +
          "&limit=" +
          limit +
          "&page=" +
          page
      )
      .do((res: Response) => console.log("Results of Brands : " + res))
      .map((res: Response) => res.json())
      .catch(this.catchError);
  }

  // Languages Data
  languages(id, pagination, limit, page) {
    return this.http
      .get(
        this.url +
          "/languages?id=" +
          id +
          "&pagination=" +
          pagination +
          "&limit=" +
          limit +
          "&page=" +
          page
      )
      .do((res: Response) => console.log("Results of Languages : " + res))
      .map((res: Response) => res.json())
      .catch(this.catchError);
  }

  // Colors Data
  colors(id, pagination, limit, page) {
    return this.http
      .get(
        this.url +
          "/colors?id=" +
          id +
          "&pagination=" +
          pagination +
          "&limit=" +
          limit +
          "&page=" +
          page
      )
      .do((res: Response) => console.log("Results of Colors : " + res))
      .map((res: Response) => res.json())
      .catch(this.catchError);
  }

  // FAQ Data
  faq(id, pagination, limit, page, lang, category_id) {
    return this.http
      .get(
        this.url +
          "/faq?id=" +
          id +
          "&pagination=" +
          pagination +
          "&limit=" +
          limit +
          "&page=" +
          page +
          "&lang=" +
          lang +
          "&category_id=" +
          category_id
      )
      .do((res: Response) => console.log("Results of FAQ : " + res))
      .map((res: Response) => res.json())
      .catch(this.catchError);
  }

  // Categories Data
  categories(id, pagination, limit, page, faq) {
    return this.http
      .get(
        this.url +
          "/categories?id=" +
          id +
          "&pagination=" +
          pagination +
          "&limit=" +
          limit +
          "&page=" +
          page +
          "&type=" +
          faq
      )
      .do((res: Response) => console.log("Results of Categories : " + res))
      .map((res: Response) => res.json())
      .catch(this.catchError);
  }

  // Guides Data
  guides(id, pagination, limit, page, lang) {
    return this.http
      .get(
        this.url +
          "/guides?id=" +
          id +
          "&pagination=" +
          pagination +
          "&limit=" +
          limit +
          "&page=" +
          page +
          "&lang=" +
          lang
      )
      .do((res: Response) => console.log("Results of Guides : " + res))
      .map((res: Response) => res.json())
      .catch(this.catchError);
  }

  // Models Data
  models(id, pagination, limit, page) {
    return this.http
      .get(
        this.url +
          "/models?id=" +
          id +
          "&pagination=" +
          pagination +
          "&limit=" +
          limit +
          "&page=" +
          page
      )
      .do((res: Response) => console.log("Results of Models : " + res))
      .map((res: Response) => res.json())
      .catch(this.catchError);
  }

  // Settings Data
  settings(key) {
    return this.http
      .get(this.url + "/settings?key=" + key)
      .do((res: Response) => console.log("Results of Settings : " + res))
      .map((res: Response) => res.json())
      .catch(this.catchError);
  }

  // Tracking Data
  tracking(tracking_number, email) {
    return this.http
      .get(
        this.url +
          "/tracking?tracking_number=" +
          tracking_number +
          "&email=" +
          email
      )
      .do((res: Response) => console.log("Results of Tracking : " + res))
      .map((res: Response) => res.json())
      .catch(this.catchError);
  }

  // Options Data
  options(id, pagination, limit, page, category_id) {
    return this.http
      .get(
        this.url +
          "/options?id=" +
          id +
          "&pagination=" +
          pagination +
          "&limit=" +
          limit +
          "&page=" +
          page +
          "&category_id=" +
          category_id
      )
      .do((res: Response) => console.log("Results of Options : " + res))
      .map((res: Response) => res.json())
      .catch(this.catchError);
  }

  // Accessories
  accessories(is_new, is_offer, min_price, max_price,name){
    return this.http.get(this.url+'/accessories?is_new='+is_new+'&is_offer='+is_offer+"&min_price=" +min_price +"&max_price=" +max_price+"&name="+name)
    .do((res: Response) => console.log("Results of Accessories : " + res))
      .map((res: Response) => res.json())
      .catch(this.catchError);
  }

  getAccessories(id){
    return this.http.get(this.url+'/accessories?id='+id)
    .do((res: Response) => console.log("Results of Accessories : " + res))
      .map((res: Response) => res.json())
      .catch(this.catchError);
  }
  // Cars Data include search
  cars(
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
    return this.http
      .get(
        this.url +
          "/cars?id=" +
          id +
          "&pagination=" +
          pagination +
          "&limit=" +
          limit +
          "&page=" +
          page +
          "&category_id=" +
          category_id +
          "&model_id=" +
          model_id +
          "&brand_id=" +
          brand_id +
          "&is_new=" +
          is_new +
          "&min_price=" +
          min_price +
          "&max_price=" +
          max_price +
          "&option_id=" +
          option_id +
          "&is_offer=" +
          is_offer +
          "&with_relation=" +
          with_relation +
          "&name=" +
          name
      )
      .do((res: Response) => console.log("Results of Options : " + res))
      .map((res: Response) => res.json())
      .catch(this.catchError);
  }

  // Request Order
  order(name,last_name, mobile, email, address, lat, long, product_id, color) {
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({ headers: headers });
    let body =
      "name=" +
      name +
      "&last_name="+
      last_name+
      "&mobile=" +
      mobile +
      "&email=" +
      email +
      "&address=" +
      address +
      "&lat=" +
      lat +
      "&long=" +
      long +
      "&product_id=" +
      product_id +
      "&color_id=" +
      color;
    return this.http
      .post(this.url + "/order", body, options)
      .map(res => res.json())
      .catch(this.catchError);
  }
  pages(id, pagination, limit, page, lang) {
    return this.http
      .get(
        this.url +
          "/pages?id=" +
          id +
          "&pagination=" +
          pagination +
          "&limit=" +
          limit +
          "&page=" +
          page +
          "&lang=" +
          lang
      )
      .map(res => res.json())
      .catch(this.catchError);
  }
  // error
  private catchError(error: Response | any) {
    console.log(error);
    return Observable.throw(error || "server error.");
  }
}
