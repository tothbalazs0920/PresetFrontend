import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
declare var amplitude: any;
import { environment } from './../../../environments/environment';
import { CheckoutService } from './../checkout/checkout.service';

@Component({
    selector: 'preset',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {

    connectedToStripe: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private checkoutService: CheckoutService) { }

    ngOnInit(): void {
        this.connectedToStripe = false;
        this.activatedRoute.queryParams.subscribe(params => {
            if (params['code']) {
                this.checkoutService.saveStripeUserId(params['code'])
                    .then(() => {
                        // amplitude.init(environment.amplitudeApiKey, null, { includeReferrer: true });
                        this.connectedToStripe = true;
                    }).catch((err) => {
                        console.log(err);
                    });
            } else {
                this.checkoutService.isStripeConnected()
                    .then((result) => {
                        if (result._body === 'true') {
                            this.connectedToStripe = true;
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
            }
        });
    }

    redirectToStripe() {
        // localStorage.setItem("stripeState", );
        window.location.href=
            'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=' +
            environment.stripeClientId + '&scope=read_write';
    }
}
