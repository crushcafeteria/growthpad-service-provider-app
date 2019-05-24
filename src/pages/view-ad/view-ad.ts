import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {LoaderProvider} from "../../providers/loader/loader";
import {AdProvider} from "../../providers/ad/ad";
import {ToastProvider} from "../../providers/toast/toast";

@IonicPage()
@Component({
    selector: 'page-view-ad',
    templateUrl: 'view-ad.html',
})
export class ViewAdPage {

    ad = null;
    profile = null;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public alertCtrl: AlertController,
                public loader: LoaderProvider,
                public adProvider: AdProvider,
                public toast: ToastProvider) {
        this.ad = navParams.get('ad');
        console.log(this.ad)

        this.storage.get('profile').then(profile => {
            this.profile = profile;
        });
    }

    trashAd(ad) {
        const confirm = this.alertCtrl.create({
            title: 'Confirm Action',
            message: 'Are you sure you want to delete this product? This action cannot be reversed',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        confirm.dismiss();
                    }
                },
                {
                    text: 'Yes, Delete',
                    handler: () => {
                        this.deleteInventory(ad.id)
                    }
                }
            ]
        });
        confirm.present();
    }

    deleteInventory(id) {
        let loader = this.loader.show('Deleting...');
        this.adProvider.deleteAd(id).then(res => {
            this.toast.show(res['msg']);
            this.navCtrl.pop();
            loader.dismiss();
        });
    }

}
