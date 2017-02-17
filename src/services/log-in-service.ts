import {Injectable} from "@angular/core";
import "rxjs/Rx";
import {PtkHttp} from "./ptkHttp";





@Injectable()
export class LogInService {

  constructor(
    private ptkHttp: PtkHttp
  ){}


  getUserToken(url, body){
    return this.ptkHttp.post(url, body)
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

