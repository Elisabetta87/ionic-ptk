import {Injectable} from "@angular/core";
import "rxjs/Rx";
import {PtkHttp} from "./ptkHttp";
import { URLs } from './URLs';




@Injectable()
export class GetChecklistId {

  constructor(
    private ptkHttp: PtkHttp
  ){}


  checklistId(body){
    return this.ptkHttp.post(URLs.APIs.checklistId, body, {withCredentials: true})
               .map(data => JSON.parse(data['_body']))
  }

}