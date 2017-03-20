import { GetJobsService } from './get-jobs';
import { Platform } from 'ionic-angular/index';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';



@Injectable()
export class PlatformService {

    private source:any;

    constructor(
        public plt: Platform,
        private getJob: GetJobsService
        ){

    this.source = Observable.fromPromise(this.plt.ready().then(ready => ready));
    
    // source.subscribe(
    //     value => console.log(value),
    //     e => console.log(e),
    //     () => console.log('complete')
    // );
    

    }

    loadPlatform() {
        this.source.subscribe(
            e => console.log(e)
        )
    }




}
