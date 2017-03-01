import { JobAcceptingPage } from './../pages/job-accepting/job-accepting';
import { DepartureChecklistPage } from './../pages/complete-departure-checklist/complete-departure-checklist';
import { Platform } from 'ionic-angular/index';
import { SpecialRequirementsPage } from './../pages/special-requirements/special-requirements';
import { RubbishInfoPage } from './../pages/rubbish-info/rubbish-info';
import { LinenInfoPage } from './../pages/linen-info/linen-info';
import { PhotosPage } from './../pages/photos/photos';
import { MenuService } from './../services/menu';
import { UpdateChecklist } from './../services/update-checklist';
import { GetChecklistId } from './../services/get-checklist-id';
import { TabsPage } from './../pages/tabs/tabs';
import { URLs } from './../services/URLs';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, App } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage} from '../pages/home/home';
import { ChecklistPage } from '../pages/checklist/checklist';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { PropertyForm } from '../components/checklist-form/checklist-form';
import { GeolocationService } from '../services/geolocation-service';
import { SecureStorage } from 'ionic-native';
import { ThankYouPage } from '../pages/thank-you/thank-you';
import { LogInPage } from '../pages/log-in/log-in';
import { LogInForm } from '../components/log-in-form/log-in-form';
import { HomePageGuest } from '../pages/home-guest/home-guest';
import { JobsListPage } from '../pages/jobs-list/jobs-list';
import { MarketPage } from '../pages/jobs-list/market';
import { JobDetailsPage } from '../pages/job-details/job-details';
import { AgmCoreModule } from 'angular2-google-maps/core/core-module';
import { GuestEntryPage } from '../pages/guest-entry/guest-entry';
import { ChecklistStatusPage } from '../pages/checklist-status/checklist-status';
import { MorePage } from '../pages/more/more';
import { InputNumber } from '../components/input-number/input-number';
import { PtkHttp } from "../services/ptkHttp";
import { LogInService } from "../services/log-in-service";
import { UserIdService } from "../services/user-id-service";
import { GetJobsService } from "../services/get-jobs";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChecklistPage,
    PropertyForm,
    ThankYouPage,
    LogInPage,
    LogInForm,
    HomePageGuest,
    JobsListPage,
    JobDetailsPage,
    GuestEntryPage,
    ChecklistStatusPage,
    MarketPage,
    MorePage,
    InputNumber,
    TabsPage,
    PhotosPage,
    LinenInfoPage,
    RubbishInfoPage,
    SpecialRequirementsPage,
    DepartureChecklistPage,
    JobAcceptingPage
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
    ChecklistPage,
    PropertyForm,
    ThankYouPage,
    LogInForm,
    LogInPage,
    HomePageGuest,
    JobsListPage,
    JobDetailsPage,
    GuestEntryPage,
    ChecklistStatusPage,
    MarketPage,
    MorePage,
    InputNumber,
    TabsPage,
    PhotosPage,
    LinenInfoPage,
    RubbishInfoPage,
    SpecialRequirementsPage,
    DepartureChecklistPage,
    JobAcceptingPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeolocationService,
    SecureStorage,
    LogInService,
    UserIdService,
    GetJobsService,
    GetChecklistId,
    UpdateChecklist,
    MenuService,
    {
      provide: PtkHttp,
      useFactory: (backend: XHRBackend, options: RequestOptions, storage: SecureStorage, app: App, platform: Platform) => new PtkHttp(backend, options, storage, app, platform),
      deps: [XHRBackend, RequestOptions, SecureStorage, App, Platform]
    }
  ]
})
export class AppModule {}
