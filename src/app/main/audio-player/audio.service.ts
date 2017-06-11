import { Injectable } from '@angular/core';
import { AudioFileService } from './audio-file.service';

@Injectable()
export class AudioService {

  audio;

  constructor(
    private audioFileService: AudioFileService
  ) {
    this.audio = new Audio();
  }

  load(audioFileId) {
    this.audio.src = this.audioFileService.getAudioFile(audioFileId);
    this.audio.load();
  }

  play(audioFileId) {
    this.load(audioFileId);
    this.audio.play();
  }
}
