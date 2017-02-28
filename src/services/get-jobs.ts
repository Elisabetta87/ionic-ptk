import { LoadingController } from 'ionic-angular/index';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {PtkHttp} from "./ptkHttp";
import { URLs } from './URLs';
import {Subject} from "rxjs/Subject";




@Injectable()
export class GetJobsService {

  constructor(
    private ptkHttp: PtkHttp
  ){}


  getJobs(params){
    return this.ptkHttp.get(URLs.APIs.getJobs + URLs.getParams(params), {withCredentials: true})
      .map(data => JSON.parse(data['_body']))
  }


  lopadJobs(params): Observable<any> {
      let subj = new Subject();
      
      if (params['user_id'] != undefined) {
            this.getJobs(params)
                .subscribe(resp => {
                    let jobs = [];
                    let jobsAvailable = false;
                    if (resp.results.length == 0) {
                        subj.next({
                          jobsAvailable : false,
                          message       : 'Sorry, no jobs available!!'
                        });
                    } else {
                        for(let i=0; i< resp.results.length; i++) {
                            jobs.push(resp.results[i]);
                        };
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


  // jobsResult(params, callback: (data) => void) {
  //     //if (params['user_id'] != undefined) {
  //      return  this.getJobs(params).subscribe(resp => {
  //             callback(resp);
  //       }
  //       )
  //       // return {
  //       //   jobs: jobs,
  //       //   jobsAvailable: jobsAvailable,
  //       //   message: message
  //       // }
  // }


  // loadJobs(resp) {
  //   let jobsAvailable: boolean = true;
  //   let jobs: Array<any> = [];
  //   let message: string = '';
  //   if (resp.results.length == 0) {
  //     jobsAvailable = false;
  //     let message = 'Sorry, no jobs available!!';
  //   } else {
  //       for(let i=0; i< resp.results.length; i++) {
  //           jobs.push(resp.results[i]);
  //       };
  //   }
  // }


  // loadJobs(params, loading) {
  //   let result: Object;
  //   let subj = new Subject();
  //   let jobsAvailable: boolean;
  //   let jobs: Array<any> = [];
  //   let message: string = '';
  //   if (params['user_id'] != undefined) {
  //     this.getJobs(params)
  //           .subscribe(resp => {
  //              jobsAvailable = true;
  //              subj.next(resp);
  //             if (resp.results.length == 0) {
  //               jobsAvailable = false;
  //               let message = 'Sorry, no jobs available!!';
  //             } else {
  //                 for(let i=0; i< resp.results.length; i++) {
  //                     jobs.push(resp.results[i]);
  //                 };
  //             }
  //            // subj.next(resp);
              
  //             //console.log(subj.next(resp));
  //             result = resp;
  //             console.log(result);
  //             loading.dismiss();
  //             return result;
  //           });
        // } else {
        //   jobsAvailable = false;
        //   message = 'Sorry, no jobs available!!';
        // }
        // return {
        //   jobs: jobs,
        //   jobsAvailable: jobsAvailable,
        //   message: message
        // }
        // loading.dismiss();
       //  return subj;
        // if (result) {
        //   console.log(result);
        //   loading.dismiss();
        //   return result;
        // }
 // }


 // }
}
