/*
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {SecureStorage} from "ionic-native/dist/es5/index";
import {NavController, App} from "ionic-angular/index";

@Injectable()
export class HttpService {

  public navCtrl: NavController;

  constructor(
    private http: Http,
    //private storage: SecureStorage,
    public app: App
  ) {
    //this.storage = new SecureStorage();
    //this.storage.create('authToken').then(() => {console.log('storage is ready')});
    this.navCtrl = app.getActiveNav();
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append("Authorization", 'Token');
    /!*this.storage.get("authToken").then(
      data => {
        console.log('Token '+data);
        headers.append("Authorization", 'Token '+data);
      },
      error => {
        console.log('no token!');
      }
    );*!/
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, body) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, body, {
      headers: headers
    });
  }


}
*/





