import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {OrderProvider} from "../../providers/order/order";
import {ViewOrderPage} from "../view-order/view-order";
import {ToastProvider} from "../../providers/toast/toast";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html',
})
export class OrdersPage {

    orders = null;
    isLoading = true;
    profile;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public orderProvider: OrderProvider,
                public toast: ToastProvider,
                public storage: Storage,
                public actionSheetCtrl: ActionSheetController,
                public menuCtrl: MenuController) {
        this.storage.get('profile').then(profile => {
            this.profile = profile;
        }).then(() => {
            this.loadOrders();
        });

        // Enable sidemenu
        this.menuCtrl.enable(true, 'sidemenu');
    }

    viewOrder(order) {
        this.navCtrl.push(ViewOrderPage, {
            order: order
        });
    }

    reloadPage(refresher) {
        this.loadOrders().then(() => {
            this.toast.show('Orders reloaded!');
            refresher.complete();
        });
    }

    loadOrders() {
        return new Promise(resolve => {
            this.orderProvider.getSPOrders(this.profile).then(res => {
                console.log(res);
                this.orders = res;
                this.isLoading = false;
                resolve(true);
            });
        });
    }

    showFilters() {
        const actionSheet = this.actionSheetCtrl.create({
            title: 'What would you like to see?',
            buttons: [
                {
                    text: 'Pending orders only',
                    handler: () => {}
                },
                {
                    text: 'Progressing orders only',
                    handler: () => {}
                },
                {
                    text: 'Completed orders only',
                    handler: () => {}
                },
                {
                    text: 'Everything',
                    handler: () => {}
                }
            ]
        });
        actionSheet.present();
    }

}
