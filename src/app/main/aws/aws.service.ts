import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { AuthHttp } from './../auth-http/auth-http';
import { environment } from './../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AwsService {
    private presignUrl = environment.apiRoot + '/api/sign-s3';

    constructor(private authHttp: AuthHttp,
        private http: Http) { }

    getPresignedUrl(name: string, type: string, mp3: string, operation: string) {
        return this.authHttp
            .get(this.presignUrl + '?file-name=' + name + '&file-type=' + type + '&mp3=' + mp3 + '&operation=' + operation)
            .toPromise()
            .then((res) => {
                return res.json();
            });
    }

    private handleError(error: any): Promise<any> {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
