import { MenuService } from './../../services/menu';
import { LoadingController } from 'ionic-angular/index';
import { StorageST } from './../../services/StorageST';
import { MessengerService } from './../../services/messenger-service';
import { Platform, Content } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Directive, ViewChild } from '@angular/core';
import { Keyboard } from 'ionic-native';

@Component({
    selector: 'messenger-page',
 templateUrl: 'messenger.html'
})


export class MessengerPage implements OnInit {
    @ViewChild(Content) content: Content;

    private messagingForm: FormGroup;
    private user_id: number;
    private msgs: {}[];
    private loading: any;
    private params: {};
    private scrollHeight;
    private scrollRequired;
    private intId;

    constructor(
        private fb: FormBuilder,
        public keyboard: Keyboard,
        public platform: Platform,
        private messengerService: MessengerService,
        private loadingCtrl: LoadingController,
        private menuService: MenuService,
        public plt: Platform
    ){
        StorageST.get('user_id').subscribe(id => {
            this.params = {user_id: +id}
            });
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.scrollHeight = 0;
    }

    ionViewWillEnter() {
        this.plt.ready().then(() => {
            Keyboard.onKeyboardShow().subscribe(res => {
                console.log(res);
                this.menuService.hideMenu();
                this.content.resize();
            });
            Keyboard.onKeyboardHide().subscribe(res => {
                console.log(res);
                this.menuService.displayMenu();
                this.content.resize();
            });
        });    
        this.loading.present();
        this.messengerService.getMessages(this.params)
                          .subscribe(messagesObj => {
                                let messages = messagesObj.results;
                                this.msgs = [];
                                for(let i=messages.length-1; i>=0; i--) {
                                    this.msgs.push(messages[i]);
                                }
                                StorageST.set('messages', {length: this.msgs.length, lastMsg: this.msgs[this.msgs.length-1]['message']});
                                // turn checkScroll interval on
                                setInterval(id => {
                                    this.checkScroll();
                                    this.intId = id;
                                },100);
                                this.loading.dismiss(); 
                            })
    }

    checkScroll() {
        if (this.scrollHeight != this.content.getContentDimensions().scrollHeight) {
            this.scrollHeight = this.content.getContentDimensions().scrollHeight;
            console.log(this.scrollHeight);
            this.scrollToBottom();
            // turn interval off
            clearInterval(this.intId);
        }
    }

     ngOnInit() {
        this.messagingForm = this.fb.group({
            message: ['', Validators.required]
        });
    }


    onSubmit() {
        let message = this.messagingForm.value;
        message.provider = this.params['user_id'];
        message.outgoing = false;
        console.log(message);
        this.messengerService.postMessages(message).subscribe(() => {
            this.messengerService.getMessages(this.params)
                            .subscribe(messagesObj => {
                                let messages = messagesObj.results;
                                this.msgs = [];
                                for(let i=messages.length-1; i>=0; i--) {
                                    this.msgs.push(messages[i]);
                                }
                                this.messagingForm.reset('');
                                setInterval(id => {
                                    this.checkScroll();
                                    this.intId = id;
                                },100);
                                // turn checkScroll interval on
                            })
        })
    }



    scrollToBottom(){
        let cd = this.content.getContentDimensions();
        console.log(cd);
        this.content.scrollToBottom();
    }

    //let dimensions = this.content.getContentDimensions();
    //this.content.scrollTo(0, this.content.contentBottom+115, 300);
    //let dimensions = this.content.getContentDimensions();
    //this.content.scrollTo(0, this.content.contentBottom+115, 300);

}