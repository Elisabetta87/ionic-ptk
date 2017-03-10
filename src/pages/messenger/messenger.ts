import { MenuService } from './../../services/menu';
import { LoadingController } from 'ionic-angular/index';
import { StorageST } from './../../services/StorageST';
import { MessengerService } from './../../services/messenger-service';
import { Platform, Content } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Directive } from '@angular/core';
import { Keyboard } from 'ionic-native';




@Component({
    selector: 'messenger-page',
 templateUrl: 'messenger.html'
})


export class MessengerPage  {

    // @Input('keyboardAttach') content: Content;

    //private messagingForm: FormGroup;
    private user_id: number;
    private msgs: {}[];
    private loading: any;
    private params: {};

    constructor(
        //private fb: FormBuilder,
        public keyboard: Keyboard,
        public platform: Platform,
        private messengerService: MessengerService,
        private loadingCtrl: LoadingController,
        private menuService: MenuService
    ){
        StorageST.get('user_id').subscribe(id => {
            this.params = {user_id: +id}
            });
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
    }

    ionViewWillEnter() {
        Keyboard.onKeyboardShow().subscribe(res => {
            console.log(res);
            this.menuService.hideMenu();
        });
        Keyboard.onKeyboardHide().subscribe(res => {
            console.log(res);
            this.menuService.displayMenu();
        });
        this.loading.present();
        this.messengerService.getMessages(this.params)
                            .subscribe(messagesObj => {
                                let messages = messagesObj.results;
                                this.msgs = [];
                                for(let i=messages.length-1; i>=0; i--) {
                                    this.msgs.push(messages[i]);
                                }
                                this.loading.dismiss(); 
                            })

    }


    //  ngOnInit() {
    //     this.messagingForm = this.fb.group({
    //         message: ['', {ValidateEvent: 'blur'}]
    //     }); 
    // }


    // onSubmit() {
    //     let message = this.messagingForm.value;
    //     console.log(message);
    // }

    keyboardCheck() {
      //console.log('The keyboard is open:', this.keyboard.show());
    }




}