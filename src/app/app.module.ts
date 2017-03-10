//ionic
import { Platform } from 'ionic-angular/index';
import { IonicApp, IonicModule, IonicErrorHandler, App } from 'ionic-angular';
import { SecureStorage, Diagnostic, Keyboard } from 'ionic-native';
//angular
import { NgModule, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core/core-module';
//my pages
import { MyApp } from './app.component';
import { HomePage} from '../pages/home/home';
import { GuestEntryPage } from '../pages/guest-entry/guest-entry';
import { MorePage } from '../pages/more/more';
import { InputNumber } from '../components/input-number/input-number';
import { ThankYouPage } from '../pages/thank-you/thank-you';
import { LogInPage } from '../pages/log-in/log-in';
import { LogInForm } from '../components/log-in-form/log-in-form';
import { HomePageGuest } from '../pages/home-guest/home-guest';
import { JobsListPage } from '../pages/jobs-list/jobs-list';
import { MarketPage } from '../pages/jobs-list/market';
import { JobDetailsPage } from '../pages/job-details/job-details';
import { SpecialRequirementsPage } from './../pages/special-requirements/special-requirements';
import { RubbishInfoPage } from './../pages/rubbish-info/rubbish-info';
import { LinenInfoPage } from './../pages/linen-info/linen-info';
import { PhotosPage } from './../pages/photos/photos';
import { MenuService } from './../services/menu';
import { TabsPage } from './../pages/tabs/tabs';
import { CleaningOverviewPage } from './../pages/cleaning-overview/cleaning-overview';
import { CleaningChecklistPage } from './../pages/cleaning-checklist/cleaning-checklist';
import { ChecklistService } from './../services/checklist';
import { JobAcceptingPage } from './../pages/job-accepting/job-accepting';
import { CleaningChecklistSecondPage } from './../pages/cleaning-checklist-2/cleaning-checklist-2';
import { CleaningChecklistForm } from './../components/cleaning-checklist-form/cleaning-checklist-form';
import { GreetingOverviewPage } from './../pages/greeting-overview/greeting-overview';
import { GreetingChecklistPage } from './../pages/greeting-checklist/greeting-checklist';
import { MessengerPage } from './../pages/messenger/messenger';
//my Services
import { PtkHttp } from "../services/ptkHttp";
import { LogInService } from "../services/log-in-service";
import { UserIdService } from "../services/user-id-service";
import { GetJobsService } from "../services/get-jobs";
import { URLs } from './../services/URLs';
import { GeolocationService } from '../services/geolocation-service';
import { StorageST } from './../services/StorageST';
import { MessengerService } from './../services/messenger-service';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CleaningChecklistPage,
    CleaningChecklistForm,
    ThankYouPage,
    LogInPage,
    LogInForm,
    HomePageGuest,
    JobsListPage,
    JobDetailsPage,
    GuestEntryPage,
    CleaningOverviewPage,
    MarketPage,
    MorePage,
    InputNumber,
    TabsPage,
    PhotosPage,
    LinenInfoPage,
    RubbishInfoPage,
    SpecialRequirementsPage,
    CleaningChecklistSecondPage,
    JobAcceptingPage,
    GreetingChecklistPage,
    GreetingOverviewPage,
    MessengerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJ2KN_uctN7_7YzB_1_DBhNVXgEb74D40'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CleaningChecklistPage,
    CleaningChecklistForm,
    ThankYouPage,
    LogInForm,
    LogInPage,
    HomePageGuest,
    JobsListPage,
    JobDetailsPage,
    GuestEntryPage,
    CleaningOverviewPage,
    MarketPage,
    MorePage,
    InputNumber,
    TabsPage,
    PhotosPage,
    LinenInfoPage,
    RubbishInfoPage,
    SpecialRequirementsPage,
    CleaningChecklistSecondPage,
    JobAcceptingPage,
    GreetingChecklistPage,
    GreetingOverviewPage,
    MessengerPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeolocationService,
    SecureStorage,
    Keyboard,
    Diagnostic,
    LogInService,
    UserIdService,
    GetJobsService,
    ChecklistService,
    MenuService,
    StorageST,
    MessengerService,
    {
      provide: PtkHttp,
      useFactory: (backend: XHRBackend, options: RequestOptions, storage: SecureStorage, app: App, platform: Platform) => new PtkHttp(backend, options, storage, app, platform),
      deps: [XHRBackend, RequestOptions, SecureStorage, App, Platform]
    }
  ]
})
export class AppModule {}
