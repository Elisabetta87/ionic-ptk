import { PtkHttp } from './ptkHttp';
import { URLs } from './URLs';
import {Injectable} from "@angular/core";


@Injectable()
export class LogInService {

  constructor(
    private ptkHttp: PtkHttp
  ){}

  getUserToken(body){
    return this.ptkHttp.post(URLs.APIs.tokenAuth, body)
               .map(data => JSON.parse(data['_body']))
  }

  getGuestJobMatch(params) {
    return this.ptkHttp.get(URLs.APIs.getGuestJobMatch+URLs.getParams(params))
               .map(data => JSON.parse(data['_body']))
  }


}

