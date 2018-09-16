import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import config from "../../config";

@Injectable()
export class SupportProvider {

    constructor(public http: HttpClient) {
    }

    getCounties() {
        return new Promise(resolve => {
            this.http.get(config.url + 'support/countyData')
                .subscribe(res => {
                    resolve(res);
                });

        });
    }

    suggestLocations(q) {
        return new Promise(resolve => {
            this.http.get(config.url + 'support/location/suggest?q='+q)
                .subscribe(res => {
                    resolve(res);
                });

        });
    }

}
