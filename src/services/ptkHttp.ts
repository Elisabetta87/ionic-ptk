import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptionsArgs, Request, Response, ConnectionBackend, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import {NavController, App, Platform} from "ionic-angular/index";
//import {LogInPage} from "../pages/log-in/log-in";
import {SecureStorage} from "ionic-native/dist/es5/index";
import {Subject} from "rxjs/Subject";


@Injectable()
export class PtkHttp extends Http {

  public navCtrl: NavController;
  //private token: string;
  private isStorageReady: boolean = false;

  constructor(
    private backend: ConnectionBackend,
    private defaultOptions: RequestOptions,
    private storage: SecureStorage,
    public app: App,
    private platform: Platform
  ) {
    super(backend, defaultOptions);

    this.storage = new SecureStorage();
    this.platform.ready().then(() => {
      this.storage.create('ptkStorage').then(
        () => this.isStorageReady = true);
    })  
    this.navCtrl = app.getActiveNav();
  }



  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }



  get(url: string, options?: RequestOptionsArgs): Observable<Response>{
    return this.getObsCustomReq(url, 'GET', options);
  }



  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>{
    return this.getObsCustomReq(url, 'POST', options, body);
  }



  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>{
    return this.getObsCustomReq(url, 'PUT', options, body);
  }



  delete(url: string, options?: RequestOptionsArgs): Observable<Response>{
    return this.getObsCustomReq(url, 'DELET$', options);
  }



  createNewRequest(reqOpts){
    return new Request(reqOpts)
  }



  setCustomRequest(url:string, method:string, options?: RequestOptionsArgs, body?:any):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let subjNewReq = new Subject();
    let reqOpts = new RequestOptions({method, headers, body, url});

    if(this.isStorageReady){
      Observable.fromPromise(this.storage.get('authToken'))
        .subscribe(
          token => {
            headers.append("Authorization", 'Token '+token);
            reqOpts.merge(options);
            subjNewReq.next( this.createNewRequest(reqOpts) );
          },
          err => {
            if( (options && options.withCredentials) ){
              console.log('DO SOMETHING IF THE TOKEN DOESN\'T EXIST AND YOU NEED IT');
            }
            else{
              console.log('YOU DON\'T NEED TOKEN', options);
              reqOpts.merge(options);
              subjNewReq.next( this.createNewRequest(reqOpts) );
            }
          }
        );
    }
    return subjNewReq;
  }



  getObsCustomReq(url:string, method:string, options?: RequestOptionsArgs, body?:any):Observable<any>{
    let subjCustomReq = new Subject();
    this.setCustomRequest(url, method, options, body)
        .subscribe(
          newCustReq => {
            this.request(newCustReq).subscribe( response => {
              subjCustomReq.next( response );
            })
          },
          err => { console.log(err); }
        );
    return subjCustomReq;
  }


}



/*

var Observable = function(){
  var arrObserver = [];
  this.subscribe = function(fn){
    arrObserver.push(fn);
  }
  this.emit = function(data){
    for(var i in arrObserver){
      arrObserver[i](data);
    }
  }
}

var obs = new Observable();

var observer1 = function(data){
  console.log('observer1: '+data);
}

var observer2 = function(data){
  console.log('observer2: '+data);
}


obs.subscribe(observer1);
obs.subscribe(observer2);

setTimeout(function(){ obs.emit('Ciao'); }, Math.random()*5000);
setTimeout(function(){ obs.emit('Elisa'); }, Math.random()*5000);

*/

