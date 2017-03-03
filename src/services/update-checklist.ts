import {Injectable} from "@angular/core";
import "rxjs/Rx";
import {PtkHttp} from "./ptkHttp";
import { URLs } from './URLs';




@Injectable()
export class UpdateChecklist {

  constructor(
    private ptkHttp: PtkHttp
  ){}


  putChecklist(id, body){
    return  this.ptkHttp.put(URLs.APIs.checklistId+URLs.getId(id), body)
                .map(data => JSON.parse(data['_body']))
  }

}
