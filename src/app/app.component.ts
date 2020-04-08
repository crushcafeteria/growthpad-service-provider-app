import {Component, ViewChild} from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LandingPage} from "../pages/landing/landing";
import {NetworkProvider} from "../providers/network/network";
import {Storage} from "@ionic/storage";
import {ToastProvider} from "../providers/toast/toast";
import config from "../config";
import {ProfilePage} from "../pages/profile/profile";
import {OrdersPage} from "../pages/orders/orders";
import {PostAdPage} from "../pages/post-ad/post-ad";
import {MyAdsPage} from "../pages/my-ads/my-ads";
import {CodePush, InstallMode, SyncStatus} from "@ionic-native/code-push";
import {FeedbackPage} from "../pages/feedback/feedback";
import {BuyCreditsPage} from "../pages/buy-credits/buy-credits";

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
    picture = null;
    credits = 0;
    latestProfile = null;
    profileInterval = null;

    constructor(public platform: Platform,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public network: NetworkProvider,
                public storage: Storage,
                public toast: ToastProvider,
                public events: Events,
                public codePush: CodePush) {
        this.initializeApp();

        // Side menu
        this.pages = [
            {title: 'Received Orders', component: OrdersPage, icon: 'basket'},
            {title: 'Add Product', component: PostAdPage, icon: 'cart'},
            {title: 'Manage Inventory', component: MyAdsPage, icon: 'cog'},
            {title: 'Buy Credits', component: BuyCreditsPage, icon: 'ios-cash'},
            {title: 'My Profile', component: ProfilePage, icon: 'contact'},
            {title: 'Send Feedback', component: FeedbackPage, icon: 'mail'},
        ];

        // Load global config
        this.config = config;

        // always load profile
        this.loadProfile();

        // Load on login event
        this.events.subscribe('logged-in', () => {
            this.loadProfile();
        });

        // update profile regularly
        this.profileInterval = setInterval(() => {
            this.loadProfile();
        }, 30000);

        // Update credits
        setInterval(() => {
            if (this.latestProfile) {
                this.credits = this.latestProfile.credits;
            }
        }, 1000);
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.storage.set('online', true);
            this.monitorNetConnection();

            this.checkUpdates();

            // Check session validity
            setInterval(() => {
                this.checkSessionValidity();
            }, 3000)
        });
    }

    monitorNetConnection(timeout = 8000) {
        setInterval(() => {
            this.network.isOnline((this.user) ? this.user.id : 'false').then(res => {
                console.log(res)
                if (res) {
                    this.storage.set('online', true);
                    this.latestProfile = res['profile'];
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

    openProfile() {
        this.nav.setRoot(ProfilePage);
    }

    loadProfile() {
        this.storage.get('profile').then(profile => {
            if (profile) {
                this.user = profile;
                this.picture = profile['picture'];
                this.credits = profile['credits'];
                this.latestProfile = profile;
            }
        });
    }

    checkUpdates() {
        this.codePush.sync({
            updateDialog: {
                appendReleaseDescription: true,
                descriptionPrefix: "\n\nMESSAGE:\n"
            },
            installMode: InstallMode.IMMEDIATE
        }).subscribe((status) => {
                if (status == SyncStatus.CHECKING_FOR_UPDATE) {
                    this.toast.show('Checking for updates...');
                } else if (status == SyncStatus.DOWNLOADING_PACKAGE) {
                    this.toast.show('Downloading update in background...');
                } else if (status == SyncStatus.INSTALLING_UPDATE) {
                    this.toast.show('Installing update and restarting...');
                } else if (status == SyncStatus.UP_TO_DATE) {
                    this.toast.show('You are now running the latest version of Growthpad Service Provider');
                }
            },
            (err) => {
                console.log('CODE PUSH ERROR: ' + err);
            });
    }

    topupCredits() {
        this.nav.setRoot(BuyCreditsPage);
        // alert('To get SP tokens, please contact the Growthpad team');
    }

    checkSessionValidity() {
        this.storage.get('token').then(token => {
            if (token) {
                this.storage.set('online', true);
            }
        });
    }
}
