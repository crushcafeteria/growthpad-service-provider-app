import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-keyword',
    templateUrl: 'keyword.html',
})
export class KeywordPage {

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController) {
    }

    saveKeyword(event) {

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }


}
