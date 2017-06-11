import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { AuthHttp } from './../auth-http/auth-http';
import { Observable } from 'rxjs/Observable';
import { PresetList } from './../preset-list/preset-list.interface';
import { environment } from './../../../environments/environment';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Preset } from './preset';
import * as _ from 'underscore';

@Injectable()
export class PresetService {
  private presetListUrl = environment.apiRoot + '/api/presets';
  private presetUpdateUrl = environment.apiRoot + '/api/preset';
  private personalPresetListUrl = environment.apiRoot + '/api/preset/profile';
  private downloadPresetUrl = environment.apiRoot + '/api/presetfile/';
  private esSearchUrl = environment.apiRoot + '/api/search/';

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getPreset(id: string): Observable<any> {
    return this.authHttp
      .get(this.presetUpdateUrl + '/' + id)
      .map((res: Response) => {
        return res.json() as Preset;
      });
  }

  getPresets(): Observable<any> {
    return this.http
      .get(this.presetListUrl)
      .map((res: Response) => {
        return res.json() as Preset[];
      });
  }

  getPersonalPresets(): Observable<any> {
    return this.authHttp
      .get(this.personalPresetListUrl)
      .map((res: Response) => {
        return res.json() as Preset[];
      });
  }

  savePreset(preset: Preset) {
    return this.authHttp
      .put(this.presetUpdateUrl, preset)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  getEsSearchResult(q: string = '*', page = 1, technology:string) {
    let params: URLSearchParams = new URLSearchParams();
    if (q) {
      params.set('q', q);
    }
    if (page) {
      params.set('page', String(page));
    }
    if(technology) {
      params.set('technology', technology);
    }

    return this.http.get(this.esSearchUrl, { search: params }).map(res => res.json());
  }

  mapSearchResult(result) {
        let presets:Preset[] = [];
        _(result.hits.hits).each(hit => {
            let preset = hit._source;
            preset._id = hit._id;
            presets.push(preset);
        });
        return presets;
    }

  downloadPreset(presetId: string) {
    return this.downloadPresetUrl + presetId;
  }

  deletePreset(presetId: string) {
    return this.authHttp
      .delete(this.presetUpdateUrl + '/' + presetId)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
