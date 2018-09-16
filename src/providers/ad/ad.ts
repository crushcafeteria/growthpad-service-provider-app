import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import config from "../../config";
import {Storage} from "@ionic/storage";
import {Authorization} from "../../authorization";

@Injectable()
export class AdProvider {

    constructor(public http: HttpClient,
                public storage: Storage) {
    }

    getAds(pageNo) {
        return new Promise((resolve) => {
            this.storage.get('token').then(token => {
                this.http.get(config.url + 'ads?page=' + pageNo, {
                    headers: new Authorization().attachToken(token.value)
                })
                    .subscribe(res => {
                        resolve(res);
                    })
            });


        });
    }

}
