import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { AuthHttp } from './../auth-http/auth-http';
import { Observable } from 'rxjs/Observable'
import { PresetList } from './../preset-list/preset-list.interface'
import { PresetService } from './preset.service'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Preset } from './preset';

export class PresetServiceMock extends PresetService {

    constructor() {
        super(null, null);
    }

    getPresets() {
        return Observable.of();
    }

    getPersonalPresets() {
        return Observable.of();
    }

    savePreset(preset: Preset) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    getSearchResult(search: string = null, page = 1, limit = 6): Observable<PresetList<Preset>> {
        return Observable.of();
    }

    downloadPreset(presetId: string) {
        return '';
    }

    deletePreset(presetId: string) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}
