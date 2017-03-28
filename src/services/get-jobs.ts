import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {PtkHttp} from "./ptkHttp";
import { URLs } from './URLs';
import {Subject} from "rxjs/Subject";


@Injectable()
export class GetJobsService {

  constructor(private ptkHttp: PtkHttp){}

  getJob(id) {
    return this.ptkHttp.get(URLs.APIs.getJobs + URLs.getId(id), {withCredentials: true})
               .map(data => JSON.parse(data['_body']))
  }

  getJobs(params){
    return this.ptkHttp.get(URLs.APIs.getJobs + URLs.getParams(params), {withCredentials: true})
               .map(data => JSON.parse(data['_body']))
  }

  updateJobs(id, body){
    return this.ptkHttp.put(URLs.APIs.getJobs + URLs.getId(id), body, {withCredentials: true})
               .map(data => JSON.parse(data['_body']))
  }

  loadJobs(params, pastJobs?:boolean): Observable<any> {
    let subj = new Subject();    
    if (params['user_id'] != undefined) {
      this.getJobs(params)
          .subscribe(resp => {
            let jobs = [];
            if (resp.results.length == 0) {
              subj.next({
                jobsAvailable : false,
                message       : 'Sorry, no jobs available!!'
              });
            } else {
              if(pastJobs) {
                for(let i=resp.results.length-1; i>=0; i--) {
                  jobs.push(resp.results[i]);
                };
              } else {
                for(let i=0; i< resp.results.length; i++) {
                  jobs.push(resp.results[i]);
                };
              }
              subj.next({
                jobsAvailable : true,
                jobs          : jobs
              });
            }
          });
    } else {
      subj.next({
        jobsAvailable : false,
        message       : 'Sorry, no jobs available!!'
      });
    }
    return subj;
  }
}
