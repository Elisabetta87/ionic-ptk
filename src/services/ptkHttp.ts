import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptionsArgs, Request, Response, ConnectionBackend, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import {NavController, App} from "ionic-angular/index";
import {LogInPage} from "../pages/log-in/log-in";
import {SecureStorage} from "ionic-native/dist/es5/index";



@Injectable()
export class PtkHttp extends Http {

  public navCtrl: NavController;

  constructor(
    private backend: ConnectionBackend,
    private defaultOptions: RequestOptions,
    private storage: SecureStorage,
    public app: App
  ) {
    super(backend, defaultOptions);
    this.storage = new SecureStorage();
    this.storage.create('authToken');
    this.navCtrl = app.getActiveNav();
  }

  getCustomRequest(url:string, method:string, options?: RequestOptionsArgs, body?:any):Request{
    let headers = new Headers();
    this.storage.get("authToken").then(
      data => {
        console.log(data);
        headers.append("Authorization", 'Token '+ data);
      },
      error => {
        console.log(error);
      }
    );
    /*if(token){

    }*/
    /*else{
      //navigate login
      console.log('no token!');
      this.navCtrl.setRoot(LogInPage);
    }*/

    let reqOpt = new RequestOptions({method, headers, body, url});
    //reqOpt = reqOpt.merge(options);
    return new Request(reqOpt.merge(options));
  }


  //request(url: string|Request, method:string, options?: RequestOptionsArgs, body?:any): Observable<Response> {
  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }


  get(url: string, options?: RequestOptionsArgs): Observable<Response>{
    return this.request(this.getCustomRequest(url, 'GET', options));
  }


  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>{
    return this.request(this.getCustomRequest(url, 'POST', options, body));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>{
    return this.request(this.getCustomRequest(url, 'PUT', options, body));
  }


  delete(url: string, options?: RequestOptionsArgs): Observable<Response>{
    return this.request(this.getCustomRequest(url, 'DELETE', options));
  }

}
