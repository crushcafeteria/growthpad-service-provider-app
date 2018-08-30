import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";

@IonicPage()
@Component({
    selector: 'page-landing',
    templateUrl: 'landing.html',
})
export class LandingPage {

    public loginForm: any;
    public backgroundImage = 'assets/img/background/background-5.jpg';

    constructor(public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public navCtrl: NavController) {
    }

    login() {
        const loading = this.loadingCtrl.create({
            duration: 1000
        });

        loading.onDidDismiss(() => {
            this.navCtrl.setRoot(HomePage);
        });

        loading.present();
    }

    goToSignup() {
        // this.navCtrl.push(SignupPage);
    }

    goToResetPassword() {
        // this.navCtrl.push(ResetPasswordPage);
    }

}
