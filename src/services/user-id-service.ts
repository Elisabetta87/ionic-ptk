import {Injectable} from "@angular/core";
import "rxjs/Rx";
import {PtkHttp} from "./ptkHttp";
import { URLs } from './URLs';




@Injectable()
export class UserIdService {

  constructor(
    private ptkHttp: PtkHttp
  ){}


  getUserId(username, options){
    return  this.ptkHttp.get(URLs.APIs.getUserId+username, options)
                .map(data => JSON.parse(data['_body']))
  }

}
