import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {SearchOptionsComponent} from "../../components/search-options/search-options";
import {AdProvider} from "../../providers/ad/ad";
import {ToastProvider} from "../../providers/toast/toast";
import {ViewAdPage} from "../view-ad/view-ad";

@IonicPage()
@Component({
    selector: 'page-list-ads',
    templateUrl: 'list-ads.html',
})
export class ListAdsPage {

    category;
    label;
    isLoading = false;
    page = null;
    ads = null;
    hasMoreData = true;
    search = false;
    q = null;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private popCtrl: PopoverController,
                public adProvider: AdProvider,
                public toast: ToastProvider) {
        this.category = this.navParams.get('category');
        this.label = this.navParams.get('label');

        this.loadAds();
    }

    showSearchOptions(event) {
        let popover = this.popCtrl.create(SearchOptionsComponent, {
            label: this.label,
            category: this.category
        });
        popover.present({
            ev: event
        });

        popover.onDidDismiss(q => {
            this.search = (q) ? true : false

            if (q) {
                this.q = q;
                this.searchAds(this.category, q);
            }
        });
    }

    loadAds(pageNo = 1) {
        return new Promise(resolve => {
            this.isLoading = true;
            this.adProvider.getAds(this.category, pageNo).then(res => {
                this.page = res;
                this.ads = res['data'];
                this.isLoading = false;
                resolve(true)
            });
        });
    }

    loadMore(infiniteScroll) {
        let nextPage = this.page.current_page + 1;

        if (this.search == true) {
            this.adProvider.searchAds(this.category, this.q, nextPage).then(res => {
                this.page = res;
                for (let i = 0; i < res['data'].length; i++) {
                    this.ads.push(res['data'][i]);
                }

                if (this.page.current_page == this.page.last_page) {
                    this.hasMoreData = false;
                }

                infiniteScroll.complete();
            });
        } else {
            this.adProvider.getAds(this.category, nextPage).then(res => {
                this.page = res;
                for (let i = 0; i < res['data'].length; i++) {
                    this.ads.push(res['data'][i]);
                }

                if (this.page.current_page == this.page.last_page) {
                    this.hasMoreData = false;
                }

                infiniteScroll.complete();
            });
        }
    }

    searchAds(category, q) {
        this.ads = this.page = null;
        return new Promise(resolve => {
            this.isLoading = true;
            this.adProvider.searchAds(category, q).then(res => {
                this.page = res;
                this.ads = res['data'];
                this.isLoading = false;
                resolve(true)
            });
        });
    }

    reloadPage() {
        this.navCtrl.pop();
        this.navCtrl.push(ListAdsPage, {
            category: this.category,
            label: this.label
        });
        this.toast.show('This page has been reloaded');
    }

    viewAd(ad) {
        this.navCtrl.push(ViewAdPage, {
            ad: ad
        });
    }

}
