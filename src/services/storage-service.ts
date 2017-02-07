import {Injectable} from "@angular/core";
import "rxjs/Rx";
import { SecureStorage } from 'ionic-native';

@Injectable()
export class StorageService {

  public secStorage: SecureStorage;

  constructor() {}


  setStorageItem(key: string, value: string) {
    this.secStorage = new SecureStorage();
    this.secStorage.create('form')
      .then(
        () => console.log('Storage is ready!'),
        error => console.log(error)
      );
    this.secStorage.set(key, value)
      .then(
        data => console.log(data),
        error => console.log(error)
      );
  }

}
