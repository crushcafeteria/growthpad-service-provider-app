import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UpdateOrderPage} from "../update-order/update-order";
import {OrderProvider} from "../../providers/order/order";
import {Storage} from "@ionic/storage";
import {LoaderProvider} from "../../providers/loader/loader";
import _ from 'lodash';
import {ToastProvider} from "../../providers/toast/toast";

@IonicPage()
@Component({
    selector: 'page-view-order',
    templateUrl: 'view-order.html',
})
export class ViewOrderPage {

    public order;
    public profile;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public orderProvider: OrderProvider,
                public storage: Storage,
                public alertCtrl: AlertController,
                public loader: LoaderProvider,
                public toast: ToastProvider) {
        this.order = this.navParams.get('order');

        this.storage.get('profile').then(profile => {
            this.profile = profile;
        });
    }

    ionViewWillEnter() {
        this.orderProvider.findOrder(this.order.id).then(order => {
            this.order = order;
        });
    }

    showUpdateOrderForm() {
        this.navCtrl.push(UpdateOrderPage, {
            order: this.order
        });
    }

    showCancellationOptions() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Why are you cancelling this order?');

        alert.addInput({
            type: 'radio',
            label: 'I am unable to supply',
            value: 'CANNOT SUPPLY',
            checked: false
        });

        alert.addInput({
            type: 'radio',
            label: 'Customer taking too long to pay',
            value: 'DELAYED PAYMENT',
            checked: false
        });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: reason => {
                this.cancelOrder(reason);
            }
        });
        alert.present();

    }

    private cancelOrder(reason) {
        let loader = this.loader.show('Cancelling...');

        this.orderProvider.cancelOrder(this.order, reason).then(res => {
            if (_.has('error', res)) {
                this.toast.show(res['error']);
            } else {
                this.order = res;
                this.toast.show('This order has been successfully cancelled');
            }
            loader.dismiss();
        });
    }

    acceptOrder() {
        let loader = this.loader.show('Accepting...');
        this.orderProvider.acceptOrder(this.order).then(res => {
            if (_.has('error', res)) {
                this.toast.show(res['error']);
            } else {
                this.order = res;
                this.toast.show('You have accepted this order');
            }
            loader.dismiss();
        });
    }

    completeOrder() {
        let loader = this.loader.show('Completing...');
        this.orderProvider.completeOrder(this.order).then(res => {
            if (_.has('error', res)) {
                this.toast.show(res['error']);
            } else {
                this.order = res;
                this.toast.show('Congratulations! You have completed this order');
            }
            loader.dismiss();
        })
    }
}
