import {Injectable} from "@angular/core";
import "rxjs/Rx";
import {PtkHttp} from "./ptkHttp";
import { URLs } from './URLs';




@Injectable()
export class GetJobsService {

  constructor(
    private ptkHttp: PtkHttp
    //private http: Http
  ){}


  getJobs(params){
    return this.ptkHttp.get(URLs.APIs.getJobs + URLs.getParams(params), {withCredentials: true})
      .map(data => JSON.parse(data['_body']))
  }

}
