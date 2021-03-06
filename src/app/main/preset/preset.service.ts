import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { AuthHttp } from './../auth-http/auth-http';
import { Observable } from 'rxjs/Observable';
import { PresetList } from './../preset-list/preset-list.interface';
import { environment } from './../../../environments/environment';
declare var amplitude: any;
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Preset } from './preset';
import * as _ from 'underscore';

@Injectable()
export class PresetService {
  private presetListUrl = environment.apiRoot + '/api/presets';
  private presetUpdateUrl = environment.apiRoot + '/api/preset';
  private personalPresetListUrl = environment.apiRoot + '/api/preset/profile';
  private esSearchUrl = environment.apiRoot + '/api/search/';
  private updateDownloadedPresetsUrl = environment.apiRoot + '/api/user/downloads';
  private downloadedPresetsUrl = environment.apiRoot + '/api/mydownloads';

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
    if (preset.youtubeUrl) {
      preset.youtubeUrl = this.getIdFromYouTubeUrl(preset.youtubeUrl);
    }
    return this.authHttp
      .put(this.presetUpdateUrl, preset)
      .toPromise()
      .then((response) => {
        console.log(response);
        return response.json() as Preset;
      }).catch(this.handleError);
  }

  updateDownloadedPreset(email, presetId) {
    return this.authHttp
      .put(this.updateDownloadedPresetsUrl, { 'email': email, 'presetId': presetId })
      .toPromise();
  }

  getDownloadedPreset() {
    return this.authHttp
      .get(this.downloadedPresetsUrl)
      .map((res: Response) => {
        return res.json() as Preset[];
      });
  }

  isPresetDownLoaded(id) {
    return this.authHttp
      .get(this.downloadedPresetsUrl)
      .map((res: Response) => {
        let presets = res.json() as Preset[];
        let found = presets.find(x => x._id === id);
        if (found) {
          return true;
        }
        return false;
      },
      err => {
        console.log(err)
        return false;
      });
  }

  private getIdFromYouTubeUrl(url) {
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  }

  getEsSearchResult(q: string = '*', page = 1, technology: string) {
    let params: URLSearchParams = new URLSearchParams();
    if (q) {
      params.set('q', q);
    }
    if (page) {
      params.set('page', String(page));
    }
    if (technology) {
      params.set('technology', technology);
    }

    return this.http.get(this.esSearchUrl, { search: params }).map(res => res.json());
  }

  mapSearchResult(result) {
    let presets: Preset[] = [];
    _(result.hits.hits).each(hit => {
      let preset = hit._source;
      preset._id = hit._id;
      presets.push(preset);
    });
    return presets;
  }

  deletePreset(presetId: string) {
    return this.authHttp
      .delete(this.presetUpdateUrl + '/' + presetId)
      .toPromise()
      .then(response => console.log(response))
      .catch(error => this.handleError(error));
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
