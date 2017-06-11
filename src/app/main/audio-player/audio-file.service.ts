import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable()
export class AudioFileService {
  private URL = environment.apiRoot + '/api/audio/';
  constructor(
  ) { }

  getAudioFile(audioFileId: string) {
    return this.URL + audioFileId;
  }
}
