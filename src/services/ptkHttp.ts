import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptionsArgs, Request, Response, ConnectionBackend, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import {NavController, App} from "ionic-angular/index";
import {LogInPage} from "../pages/log-in/log-in";
import {SecureStorage} from "ionic-native/dist/es5/index";


//GreenTurtle2017
@Injectable()
export class PtkHttp extends Http {

  public navCtrl: NavController;
  private token: string;

  constructor(
    private backend: ConnectionBackend,
    private defaultOptions: RequestOptions,
    private storage: SecureStorage,
    public app: App
  ) {
    super(backend, defaultOptions);
    this.storage = new SecureStorage();
    this.storage.create('authToken').then(() => {console.log('storage is ready')});
    this.navCtrl = app.getActiveNav();
    this.authorization().subscribe(token => this.token = token);
  }

  authorization(): Observable<any>{
    return Observable.fromPromise(this.storage.get("authToken")).map(token => token)
  }

  getCustomRequest(url:string, method:string, options?: RequestOptionsArgs, body?:any):Request{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if (options) {
      headers.append("Authorization", 'Token '+ this.token);
    }
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
