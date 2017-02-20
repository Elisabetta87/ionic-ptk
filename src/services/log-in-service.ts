import { PtkHttp } from './ptkHttp';
import { URLs } from './URLs';
import {Injectable} from "@angular/core";
import "rxjs/Rx";



@Injectable()
export class LogInService {

  constructor(
    private ptkHttp: PtkHttp,
  ){}


  getUserToken(body){
    return this.ptkHttp.post(URLs.APIs.tokenAuth, body)
               .map(data => JSON.parse(data['_body']))
  }


  /*getUserToken(url, body, options) {
    return this.ptkHttp.post(url, body, options)
                    .map(data => JSON.parse(data['_body']))

    // handle 400 error Unable to login with provided credentials
  }*/

  getGuestJobMatch(url, body) {
    return this.ptkHttp.post(url, body)
                       .map(data => data)
  }


}

