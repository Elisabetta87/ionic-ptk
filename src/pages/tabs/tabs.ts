import { JobsListPage } from './../jobs-list/jobs-list';
import { NavController } from 'ionic-angular/index';
import { LogInPage } from './../log-in/log-in';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MarketPage} from '../../pages/market/market';
import {MorePage} from '../../pages/more/more';




@Component({
    templateUrl: 'tabs.html'
})


export class TabsPage {

    
    tabRoots: Array<any> = [
        LogInPage,
        JobsListPage,
        MarketPage,
        MorePage,
        JobsListPage
    ];

    tab1Root: any = this.tabRoots[0];
    tab2Root: any = this.tabRoots[1];
    tab3Root: any = this.tabRoots[2];
    tab4Root: any = this.tabRoots[3];
    tab5Root: any = this.tabRoots[4];


    hasToShowTabs: boolean = false;

    constructor(private navCtrl: NavController) {
        
    }

    ionViewDidEnter(){
        //console.log( this.navCtrl.getActive() );
        console.log( this.navCtrl.getActive().index );


        //this.hasToShowTabs = this.tabRoots[this.navCtrl.getActive().index] !== LogInPage;
        //console.log(this.hasToShowTabs);
        
        //document.getElementsByClassName('tab-button')[0]['style'].display = 'none'
        //document.querySelector('.tabbar.show-tabbar')['style'].display = this.hasToShowTabs ? 'flex' : 'none';
        //document.querySelector('a.tab-button')[0].style.display = 'none';
        //console.log( this.tabRoots[this.navCtrl.getActive().index] , LogInPage );

        if (this.navCtrl.getActive().index == 0) {
           document.getElementsByClassName('tab-button')[0]['style'].display = 'none';
           document.querySelector('.tabbar.show-tabbar')['style'].display = this.hasToShowTabs ? 'flex' : 'none';
           if( !this.hasToShowTabs ){
              document.getElementsByClassName('scroll-content')[1]['style'].marginBottom = '0px';
              document.getElementsByClassName('fixed-content')[1]['style'].marginBottom = '0px';
           }
        } else {
              document.querySelector('.tabbar.show-tabbar')['style'].display = 'flex';
              document.getElementsByClassName('scroll-content')[1]['style'].marginBottom = '56px';
              document.getElementsByClassName('fixed-content')[1]['style'].marginBottom = '56px';
        }
    }

    
    // ionViewDidEnter(){
    //     console.log('DID ENTER', this.navCtrl.getActive());
    //     document.getElementsByClassName('tab-button')[0]['style'].display = 'none';
    //     document.querySelector('.tabbar.show-tabbar')['style'].display = this.hasToShowTabs ? 'flex' : 'none';
        
    //     if( !this.hasToShowTabs ){
    //         document.getElementsByClassName('scroll-content')[1]['style'].marginBottom = '0px';
    //         document.getElementsByClassName('fixed-content')[1]['style'].marginBottom = '0px';
    //     }
    // }
    
    ionViewWillLeave() {
         // console.log(document.getElementsByClassName('scroll-content')[1]);
        // document.querySelector('.tabbar.show-tabbar')['style'].display = 'flex';
                // document.getElementsByClassName('scroll-content')[1]['style'].marginBottom = '56px';
                // document.getElementsByClassName('fixed-content')[1]['style'].marginBottom = '56px';
    }
    
}