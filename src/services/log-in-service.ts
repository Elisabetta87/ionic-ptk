import {Injectable} from "@angular/core";
import "rxjs/Rx";
import {PtkHttp} from "./ptkHttp";




@Injectable()
export class LogInService {

  private url: string = '';// http://ptkconnect.co.uk/api/token-auth  


  constructor(private ptkHttp: PtkHttp){}


  getUserToken(data){
    return this.ptkHttp.post('url', data)
      .map(data => JSON.parse(data['_body']))
  }



}

