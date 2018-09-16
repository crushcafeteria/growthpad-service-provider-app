import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';

@Injectable()
export class LoaderProvider {

    constructor(public http: Http, private loadingCtrl: LoadingController) {
    }

    show(text = 'Loading...') {
        let loader = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: text,
            enableBackdropDismiss: true
        });

        loader.present();
        return loader;
    }

}
