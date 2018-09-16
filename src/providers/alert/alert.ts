import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AlertController} from "ionic-angular";

@Injectable()
export class AlertProvider {

    constructor(public http: HttpClient,
                public alertCtrl: AlertController) {
    }


    message(message, title = 'Message', button: any ='OK') {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: [button]
        });

        alert.present();
    }

}
