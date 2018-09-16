import {HttpHeaders} from "@angular/common/http";

class Authorization {

    // Build API Authorization header
    attachToken(token: string) {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        })
    }
}

export {Authorization};
