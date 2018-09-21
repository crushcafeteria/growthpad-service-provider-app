import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {LandingPage} from "../pages/landing/landing";
import {NetworkProvider} from "../providers/network/network";
import {Storage} from "@ionic/storage";
import {ToastProvider} from "../providers/toast/toast";
import config from "../config";
import {ProfilePage} from "../pages/profile/profile";
import {OrdersPage} from "../pages/orders/orders";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LandingPage;
    pages: Array<{ title: string, component: any, icon: string }>;
    pingTries = 0;
    offlineMsgDisplayed = false;
    user = null;
    config: any;

    constructor(public platform: Platform,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public network: NetworkProvider,
                public storage: Storage,
                public toast: ToastProvider) {
        this.initializeApp();

        // Side menu
        this.pages = [
            {title: 'Marketplace', component: HomePage, icon: 'basket'},
            {title: 'My Orders', component: OrdersPage, icon: 'apps'},
            {title: 'My Profile', component: ProfilePage, icon: 'contact'},
        ];

        // Load global config
        this.config = config;

        // Check authentication status
        this.storage.get('profile').then(profile => {
            if (profile) {
                this.user = profile;
            }
        })

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.monitorNetConnection();
        });
    }

    monitorNetConnection(timeout = 8000) {
        setInterval(() => {
            this.network.isOnline().then(res => {
                if (res) {
                    this.storage.set('online', true);
                    this.pingTries = 0;

                    if (this.offlineMsgDisplayed) {
                        this.toast.show('You are back online!');
                        this.offlineMsgDisplayed = false;
                    }
                } else {
                    this.storage.set('online', false);
                    this.pingTries = this.pingTries + 1;
                }
            });
        }, timeout);

        // Show network disconnected msg
        setInterval(() => {
            if (this.pingTries > 0) {
                if (!this.offlineMsgDisplayed) {
                    this.toast.show('Internet disconnected. Please ensure your data connection is active.', 6000);
                }
                this.offlineMsgDisplayed = true;
            }
        }, 1000);
    }

    logout() {
        this.storage.clear().then(() => {
            this.nav.setRoot(LandingPage);
            this.toast.show('See you soon!')
        }).then(() => {
            this.storage.set('online', true);
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }
}
