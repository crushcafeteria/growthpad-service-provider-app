import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AdProvider} from '../providers/ad/ad';
import {LandingPageModule} from "../pages/landing/landing.module";
import {HttpClientModule} from "@angular/common/http";
import {SearchOptionsComponent} from "../components/search-options/search-options";
import {KeywordPageModule} from "../pages/search/keyword/keyword.module";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        SearchOptionsComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        LandingPageModule,
        KeywordPageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        SearchOptionsComponent,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AdProvider
    ]
})
export class AppModule {
}
