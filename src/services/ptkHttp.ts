import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptionsArgs, Request, Response, ConnectionBackend, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';



@Injectable()
export class PtkHttp extends Http {

  constructor(private backend: ConnectionBackend, private defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  getCustomRequest(url:string, method:string, options?: RequestOptionsArgs, body?:any):Request{
    let headers = new Headers();
    let token = localStorage.getItem("token");
    if(token){
      headers.append("Authorization", 'Token '+ token);
    }
    else{
      //navigate login
      console.log('no token!');
    }

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
    return this.request(this.getCustomRequest(url, 'GET', options, body));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>{
    return this.request(this.getCustomRequest(url, 'GET', options, body));
  }


  delete(url: string, options?: RequestOptionsArgs): Observable<Response>{
    return this.request(this.getCustomRequest(url, 'GET', options));
  }

}
