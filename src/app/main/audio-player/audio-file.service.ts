import { Injectable } from '@angular/core';

@Injectable()
export class AudioFileService {
  private URL = 'http://localhost:3001/api/audio/';
  constructor(
  ) { }

  getAudioFile(audioFileId: string) {
    return this.URL + audioFileId;
  }
}
