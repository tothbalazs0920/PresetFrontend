import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './../user/auth.service';

import { Preset } from './../preset/preset';
import { PresetService } from './../preset/preset.service';
import { AudioService } from './../audio-player/audio.service';
import { PresetListComponent } from './preset-list.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'preset-list',
    templateUrl: 'public-preset-list.component.html',
    styleUrls: ['preset-list.component.css']
})
export class PublicPresetListComponent extends PresetListComponent implements OnInit {
    presets: Preset[];
    total: number;
    technologies = ['', 'Kemper', 'Axe Fx II XL+', 'AX8', 'Helix'];
    errorMessage: string;
    queryObject: any = {
        q: '',
        technology: '',
        page: 0
    };
    private _queryParamsSubscription;
    pages: any[] = [];

    @ViewChild('loginModal')
    modal: ModalComponent;

    constructor(
        private AudioService: AudioService,
        private presetService: PresetService,
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        super(AudioService);
    }

    ngOnInit(): void {
        this._queryParamsSubscription = this.activatedRoute
            .queryParams
            .subscribe(
            params => {
                if (Object.keys(params).length === 0) {
                    this.queryObject.page = 1;
                } else {
                    if (params['token']) {
                        localStorage.setItem("token", params['token']);
                    }
                    this.queryObject.page = +params['page'];
                    this.queryObject.q = params['q'] || '';
                    this.queryObject.technology = params['technology'] || '';
                }
                this.getEsSearchResult(this.queryObject.q, this.queryObject.page, this.queryObject.technology);
            });
    }

    getEsSearchResult(q: string, page: number = 1, technology: string) {
        this.presetService
            .getEsSearchResult(q, page, technology)
            .subscribe(
            result => {
                this.total = result.hits.total;
                this.pages.length = Math.ceil(result.hits.total / 3);
                return this.presets = this.presetService.mapSearchResult(result);
            },
            error => this.errorMessage = <any>error);
    }

    onSubmit(q: string, page: number) {
        if (this.queryObject.page < 1 || this.queryObject.page > this.pages.length) {
            return;
        }
        this.queryObject.q = q;
        this.queryObject.page = page;
        this.router.navigate(['/presets'], { queryParams: this.queryObject });
    }


    getPageWithSearchResult(page: number): void {
        if (this.queryObject.page < 1 || this.queryObject.page > this.pages.length) {
            return;
        }

        this.queryObject.page = page;
        this.router.navigate(['/presets'], { queryParams: this.queryObject });
    }
}
