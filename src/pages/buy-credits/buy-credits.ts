import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {OrdersPage} from "../orders/orders";
import {LoaderProvider} from "../../providers/loader/loader";
import config from "../../config";
import {VerifyPaymentPage} from "../verify-payment/verify-payment";

@IonicPage()
@Component({
    selector: 'page-buy-credits',
    templateUrl: 'buy-credits.html',
})
export class BuyCreditsPage {

    credits = 500;
    step = 1;
    config = config

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loader: LoaderProvider) {
    }

    verifyPayment(step) {
        this.navCtrl.push(VerifyPaymentPage);
    }

    goHome() {
        this.navCtrl.setRoot(OrdersPage);
    }

}
