import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {AdProvider} from "../../providers/ad/ad";
import {ViewAdPage} from "../view-ad/view-ad";
import {Storage} from "@ionic/storage";
import {PostAdPage} from "../post-ad/post-ad";
import _ from 'lodash';
import {ToastProvider} from "../../providers/toast/toast";

@IonicPage()
@Component({
    selector: 'page-my-ads',
    templateUrl: 'my-ads.html',
})
export class MyAdsPage {

    SP;
    ads;
    isLoading = true;
    page;
    hasMoreData = true;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public adProvider: AdProvider,
                public storage: Storage,
                public menuCtrl: MenuController,
                public toast: ToastProvider) {
        this.SP = this.navParams.get('sp');

        // Enable sidemenu
        this.menuCtrl.enable(true, 'sidemenu');

        // Load SP ads
        this.storage.get('profile').then(profile => {
            this.SP = profile;
        }).then(() => {
            this.loadInventory();
        });
    }

    viewAd(ad) {
        this.navCtrl.push(ViewAdPage, {
            ad: ad
        });
    }

    goToPostAd() {
        this.navCtrl.push(PostAdPage);
    }

    loadInventory() {
        return new Promise(resolve => {
            this.adProvider.getSPAds(this.SP.id).then(res => {
                this.page = res;
                this.ads = res;

                if (!_.size(res['data'])) {
                    this.ads = null;
                } else {
                    this.ads = res['data'];
                }
                this.isLoading = false;
                resolve(true)
            });
        });
    }

    loadMore(infiniteScroll) {
        let nextPage = this.page.current_page + 1;

        this.adProvider.getSPAds(this.SP.id, nextPage).then(res => {
            this.page = res;
            for (let i = this.ads.length; i < res['data'].length; i++) {
                this.ads.push(res['data'][i]);
            }

            if (this.page.current_page == this.page.last_page) {
                this.hasMoreData = false;
            }

            infiniteScroll.complete();
        });
    }

    doRefresh(refresher) {
        this.loadInventory().then(()=>{
            this.toast.show('Your products have been refreshed!');
            refresher.complete();
        });
    }
}
