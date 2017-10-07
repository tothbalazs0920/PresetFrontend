import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from './../auth-http/auth-http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
declare var amplitude: any;
declare var StripeCheckout: any;
import { Preset } from '../preset/preset';

@Injectable()
export class CheckoutService {
    private stripePayment = environment.apiRoot + '/api/stripepayment';
    private stripeUserIdUrl = environment.apiRoot + '/api/stripe';

    constructor(private http: Http, private authHttp: AuthHttp) { }

    public takePayment(amount: number, currency: string, presetId: string, presetUploaderEmail: string, token: any) {
        let body = {
            tokenId: token.id,
            amount: amount,
            currency: currency,
            presetId: presetId,
            presetUploaderEmail: presetUploaderEmail
        };
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.authHttp.post(this.stripePayment, bodyString, options)
            .toPromise()
            .then((res) => {
                console.log(res);
                // this.takePaymentResult = res.json().status;
            })
            .catch((error) => {
                console.log(error);
                // this.takePaymentResult = error.message
            });
    }

    public saveStripeUserId(stripeCode: string): any {
        return this.authHttp.post(this.stripeUserIdUrl, { stripeCode: stripeCode })
            .toPromise();
    }

    public isStripeConnected(): any {
        return this.authHttp.get(this.stripeUserIdUrl)
            .toPromise();
    }

    public openCheckout(productName: string, amount: number, currency: string, tokenCallback) {
        let handler = StripeCheckout.configure({
            key: 'pk_test_XxlFD3cSJpDuq3dqslIlSjAj',
            locale: 'auto',
            token: tokenCallback
        });

        handler.open({
            name: 'Guitar Tone Finder',
            description: productName,
            zipCode: false,
            currency: currency,
            amount: amount,
            panelLabel: "Buy {{amount}}",
            allowRememberMe: false
        });
    }

    private handleError(error: any): Promise<any> {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
