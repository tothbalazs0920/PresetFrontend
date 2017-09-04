import { Component, OnInit } from '@angular/core';
import { CustomAuthService } from './../user/auth.service';

import { Preset } from './../preset/preset';
import { PresetService } from './../preset/preset.service';
import { AudioService } from './../audio-player/audio.service';
import { PresetListComponent } from './preset-list.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';
import { environment } from './../../../environments/environment';
import { AwsService } from './../aws/aws.service';
declare var amplitude: any;

@Component({
    selector: 'preset-list',
    templateUrl: 'public-preset-list.component.html',
    styleUrls: ['preset-list.component.css']
})
export class PublicPresetListComponent extends PresetListComponent implements OnInit {
    presets: Preset[];
    total: number;
    errorMessage: string;
    queryObject: any = {
        q: '',
        technology: '',
        page: 0
    };
    private _queryParamsSubscription;
    pages: any[] = [];
    paginationNumbers: number[] = [];
    imageBaseUrl = 'https://s3-eu-west-1.amazonaws.com/guitar-tone-finder-images/'

    constructor(
        private AudioService: AudioService,
        private presetService: PresetService,
        private CustomAuthService: CustomAuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        protected awsService: AwsService
    ) {
        super(AudioService, awsService);
    }

    ngOnInit(): void {
        amplitude.init(environment.amplitudeApiKey, null, { includeReferrer: true });
        this._queryParamsSubscription = this.activatedRoute
            .queryParams
            .subscribe(
            (params) => {
                if (Object.keys(params).length === 0) {
                    this.queryObject.page = 1;
                } else {
                    if (params['token']) {
                        localStorage.setItem("token", params['token']);
                    }
                    if (params['page']) {
                        this.queryObject.page = params['page'];
                    }
                    this.queryObject.q = params['q'] || '';
                    this.queryObject.technology = params['technology'] || '';
                }
                this.getEsSearchResult(this.queryObject.q, this.queryObject.page, this.queryObject.technology);
            });
    }

    getEsSearchResult(q: string, page: number = 1, technology: string) {
        amplitude.getInstance().logEvent('clicked-search' + environment.postFix, { 'search-term': q, 'technology': 'technology' });
        return this.presetService
            .getEsSearchResult(q, page, technology)
            .subscribe(
            result => {
                this.total = result.hits.total;
                this.pages.length = Math.ceil(result.hits.total / 3);
                this.paginationNumbers = [];
                for (let i = 1; i <= this.pages.length; i++) {
                    this.paginationNumbers.push(i);
                }
                return this.presets = this.presetService.mapSearchResult(result);
            },
            error => this.errorMessage = <any>error);
    }

    getPageWithSearchResult(page: number): void {
        this.queryObject.page = page;
        this.router.navigate(['/presets'], { queryParams: this.queryObject });
    }

    getImageUrl(imagageId: string) {
        if (imagageId) {
            return this.imageBaseUrl + imagageId;
        }
        return 'https://www.shareicon.net/data/128x128/2016/05/13/764563_music_512x512.png';
    }
}
