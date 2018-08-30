import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import config from "../../config";

/*
  Generated class for the AdProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdProvider {

    constructor(public http: HttpClient) {
    }

    getAds(pageNo) {
        return new Promise((resolve) => {
            this.http.get(config.url + 'ads?page=' + pageNo)
                .subscribe(res => {
                    resolve(res);
                })

        });
    }

}
