import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import {PtkHttp} from "./ptkHttp";
import { URLs } from './URLs';




@Injectable()
export class ChecklistService {

  constructor(
    private ptkHttp: PtkHttp
  ){}


  getChecklist(service, checklistId){
    return this.ptkHttp.get(URLs.APIs.checklistId+URLs.checklistId(service, checklistId))
               .map(data => JSON.parse(data['_body']))
  }

  putChecklist(service, checklistId, body){
    return  this.ptkHttp.put(URLs.APIs.checklistId+URLs.checklistId(service, checklistId), body)
                .map(data => JSON.parse(data['_body']))
  }

}