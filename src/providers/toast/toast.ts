import {Injectable} from '@angular/core';
import {ToastController} from 'ionic-angular';

@Injectable()
export class ToastProvider {
    constructor(public toastCtrl: ToastController) {
    }

    show(msg, duration = 3000, position = 'bottom') {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: duration,
            position: position
        });
        toast.present();
    }

}
