import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable()
export class AudioFileService {
  private URL = 'https://s3-eu-west-1.amazonaws.com/guitar-tone-finder-samples' + environment.s3Postfix + '/'; 
  constructor(
  ) { }

  getAudioFile(audioFileId: string) {
    return this.URL + audioFileId;
  }
}
