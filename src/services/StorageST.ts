import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { SecureStorage } from 'ionic-native';
import { Injectable } from '@angular/core';


@Injectable()
export class StorageST {
    private static st:SecureStorage = null;
    
    public static getStorage(): Observable<SecureStorage>{
        let storage = new Subject<SecureStorage>();

        if( StorageST.st === null ){
            StorageST.st = new SecureStorage();
            Observable.fromPromise(this.st.create('ptkStorage'))
                      .subscribe(() => { storage.next(StorageST.st); })
        }
        else{
            storage.next(StorageST.st);
        }
        return storage;
    }
}


/* HOW TO USE */
let subj = new Subject();
StorageST.getStorage()
         .subscribe((storage) => {
             Observable.fromPromise(storage.get('key')).subscribe((data) => { subj.next(data); })
             storage.set('key', 'value').then(() => { /* your code here (or emit new value for observers) */ });
             storage.remove('key').then(() => { /* your code here (or emit new value for observers) */ });
         })
// if youu need to return a value/Observable
// return subj;         