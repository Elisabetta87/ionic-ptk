import {Injectable} from "@angular/core";
import "rxjs/Rx";
import {PtkHttp} from "./ptkHttp";




@Injectable()
export class UserIdService {

  constructor(
    private ptkHttp: PtkHttp
  ){}


  getUserId(url, options){
    return  this.ptkHttp.get(url, options)
                .map(data => JSON.parse(data['_body']))
  }

}
