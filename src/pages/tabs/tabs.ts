import { MessengerService } from './../../services/messenger-service';
import { KeyboardAttachDirective } from './../../directives/keyboard-attach-directive';
import { MessengerPage } from './../messenger/messenger';
import { StorageST } from './../../services/StorageST';
import { SecureStorage } from 'ionic-native';
import { JobsListPage } from './../jobs-list/jobs-list';
import { MarketPage} from '../../pages/jobs-list/market';
import { NavController } from 'ionic-angular/index';
import { LogInPage } from './../log-in/log-in';
import { Component } from '@angular/core';
import {MorePage} from '../../pages/more/more';


@Component({
    templateUrl: 'tabs.html',
    selector: 'tabs',
    providers: [SecureStorage, StorageST, KeyboardAttachDirective]
})


export class TabsPage {

    private params: {};
    private diff: number;
    private el: any;
    
    tabRoots: Array<any> = [
        JobsListPage,
        MarketPage,
        MorePage,
        MessengerPage
    ];

    tab1Root: any = this.tabRoots[0];
    tab2Root: any = this.tabRoots[1];
    tab3Root: any = this.tabRoots[2];
    tab4Root: any = this.tabRoots[3];

    constructor(
        private navCtrl: NavController,
        private storage: SecureStorage,
        private msgService: MessengerService
        ) { 
        }

        // ionViewDidEnter() {
        //     this.el = document.createElement('ion-badge');
        //     this.el['style'].display = 'none';
        //     let item = document.getElementsByClassName('tab-button-icon')[3];
        //     item.insertBefore(this.el, item.childNodes[0]);
        //     item.appendChild(this.el);
        //     StorageST.get('user_id').subscribe(id => {this.params = {user_id: +id}});
        //     this.msgService.interval(this.params).subscribe(lastMsgs => {
        //         StorageST.get('messages').subscribe(res => {
        //             if(JSON.parse(res).length !== lastMsgs.length) {
        //                 this.diff = lastMsgs.results.length - JSON.parse(res).length;
        //                 if (this.diff > 0) {
        //                     this.changeHtmlValue(this.diff.toString());
        //                     this.el['style'].display = 'inline-block';
        //                 }
        //             }
        //         })
        //     });
        // }


        // changeHtmlValue(val: string) {
        //     this.el.innerHTML = val; 
        // }   

}