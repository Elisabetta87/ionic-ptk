import {Injectable} from "@angular/core";
import {Http, Headers, Response, RequestOptions, RequestMethod} from "@angular/http";
import "rxjs/Rx";
import {PtkHttp} from "./ptkHttp";




@Injectable()
export class LogInService {

  constructor(
    private ptkHttp: PtkHttp
   // private http: Http
  ){}


  getUserToken(url, body, authorization){
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({headers: headers});
    return this.ptkHttp.post(url, body, authorization)
      .map(data => JSON.parse(data['_body']))
  }

  /*getUserToken(url, body) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, body, options)
                    .map(data => JSON.parse(data['_body']))

    // handle 400 error Unable to login with provided credentials
  }*/


  getGuestJobMatch(url, body) {
    return this.ptkHttp.post(url, body)
                       .map(data => data)
  }


}

