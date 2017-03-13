import { Observable } from 'rxjs/Rx';
import { URLs } from './URLs';
import { PtkHttp } from './ptkHttp';
import { Injectable } from '@angular/core';






@Injectable()
export class MessengerService {

    constructor(
        private ptkHttp: PtkHttp
    ){
    }

    getMessages(params) {
        return this.ptkHttp.get(URLs.APIs.messages+URLs.getParams(params))
                    .map(data => JSON.parse(data['_body']))
    }

    interval(params) {
        return Observable.interval(300000)
                    .flatMap(() => this.getMessages(params))
    }

    postMessages(body) {
        return this.ptkHttp.post(URLs.APIs.messages, body)
                    .map(data => JSON.parse(data['_body']))
    }
    
}

