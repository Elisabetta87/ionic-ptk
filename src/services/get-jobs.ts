
//http://ptkconnect.co.uk/api/v2/jobs?provider=15&status=accepted,completed&start_date=2017-2-13&end_date=2017-2-27


import {Injectable} from "@angular/core";
import "rxjs/Rx";
import {PtkHttp} from "./ptkHttp";




@Injectable()
export class GetJobsService {

  constructor(
    private ptkHttp: PtkHttp
    //private http: Http
  ){}


  getJobs(url, options){
    return this.ptkHttp.get(url, options)
      .map(data => JSON.parse(data['_body']))
  }

}
