import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { SecureStorage } from 'ionic-native';
import { Injectable } from '@angular/core';


@Injectable()
export class StorageST {

    //I need to check if platform is ready (for all native functionality!!!!)
    private static st:SecureStorage = null;
    private static keys: string[];
    
    public static getStorage(): Observable<SecureStorage>{
        let storage = new Subject<SecureStorage>();
            if( StorageST.st === null ){
                StorageST.st = new SecureStorage();
                StorageST.keys = [];

                Observable.fromPromise(StorageST.st.create('ptkStorage'))
                        .subscribe(() => { storage.next(StorageST.st); })
            }
            else{
                return Observable.of(StorageST.st);
            }
        return storage;
    }

    public static set(key:string, value:any): Observable<any>{
        let observableSet = new Subject();
        let val = typeof value !== 'string' ? JSON.stringify(value) : value;
        StorageST.getStorage()
                 .subscribe(st => {
                    Observable.fromPromise(st.set(key, val))
                              .subscribe( (setResp) => { 
                                  StorageST.keys.push(key);
                                  observableSet.next(setResp); 
                                });
                 });
        return observableSet;
    }

    public static get(key:string): Observable<any>{
        let observableGet = new Subject();
        StorageST.getStorage()
                 .subscribe(st => {
                    Observable.fromPromise(st.get(key))
                              .subscribe( 
                                  value => { observableGet.next(value); },
                                  err => { observableGet.next('error'); }
                               );
                 })
        return observableGet;
    }


    public static remove(key:string): Observable<any>{
        let observableRemove = new Subject();
        StorageST.getStorage()
                 .subscribe(st => {
                    Observable.fromPromise(st.remove(key))
                              .subscribe( (removeResp) => { 
                                  this.removeKey(key);
                                  observableRemove.next(removeResp); 
                                });
                 });
        return observableRemove;
    }

    public static getKeys(): string[]{
        return StorageST.keys;
    }

    private static removeKey(key){
        StorageST.keys.splice(StorageST.keys.indexOf(key),1);
    }


}
        