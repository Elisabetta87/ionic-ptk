import { Injectable } from "@angular/core";

@Injectable()
export class MenuService {

  hideMenu() {
    document.querySelector('.tabbar.show-tabbar')['style'].display = 'none'; 
  }

  displayMenu() {
    document.querySelector('.tabbar.show-tabbar')['style'].display = 'flex';
  }

}