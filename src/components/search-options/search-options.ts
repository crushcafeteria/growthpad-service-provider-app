import {Component} from '@angular/core';
import {ModalController} from "ionic-angular";
import {KeywordPage} from "../../pages/search/keyword/keyword";

@Component({
    selector: 'search-options',
    templateUrl: 'search-options.html'
})
export class SearchOptionsComponent {

    text: string;

    constructor(private modalCtrl: ModalController) {
    }

    displaySearchBox() {
        this.modalCtrl.create(KeywordPage).present();
    }

}
