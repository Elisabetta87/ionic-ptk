import {Injectable} from "@angular/core";
import { TabsPage } from './../tabs/tabs';


@Injectable()
export class MenuService {

    hasToShowTabs: boolean;
    tabBarElement: any;

  hideMenu() {
    this.hasToShowTabs = false;  
    document.getElementsByClassName('tab-button')[0]['style'].display = 'none';
    document.querySelector('.tabbar.show-tabbar')['style'].display = this.hasToShowTabs ? 'flex' : 'none'; 
        if( !this.hasToShowTabs ){
            document.getElementsByClassName('scroll-content')[1]['style'].marginBottom = '0px';
            document.getElementsByClassName('fixed-content')[1]['style'].marginBottom = '0px';
        }
  }

  displayMenu() {
    this.hasToShowTabs = true;
    document.getElementsByClassName('tab-button')[0]['style'].display = 'none';
    document.querySelector('.tabbar.show-tabbar')['style'].display = this.hasToShowTabs ? 'flex' : 'none';
        if( !this.hasToShowTabs ){
            document.getElementsByClassName('scroll-content')[1]['style'].marginBottom = '0px';
            document.getElementsByClassName('fixed-content')[1]['style'].marginBottom = '0px';
        }
  }

}