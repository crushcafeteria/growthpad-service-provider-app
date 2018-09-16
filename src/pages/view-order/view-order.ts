import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-view-order',
    templateUrl: 'view-order.html',
})
export class ViewOrderPage {

    public order;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.order = this.navParams.get('order')
    }

}
