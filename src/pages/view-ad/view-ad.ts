import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {AddToCartPage} from "../add-to-cart/add-to-cart";

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
                public modalCtrl: ModalController) {
        this.ad = navParams.get('ad');
        console.log(this.ad)

        this.storage.get('profile').then(profile => {
            this.profile = profile;
        });
    }

    addToCart(ad) {
        this.modalCtrl.create(AddToCartPage, {
            ad: ad
        }).present();
    }

}
