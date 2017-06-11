import { Component } from '@angular/core';
import { AudioService } from './../audio-player/audio.service';


@Component({
  selector: 'app-preset-list'
})

export class PresetListComponent {
  playing = false;
  current?: string;
  
  constructor(
    protected audioService: AudioService) {
  }

  handlePlay(_id: string, audioFileId: number) {
    this.current = _id;
    this.audioService.play(audioFileId);
    this.playing = true;
  }

  handlePause(id: string) {
    this.current = id;
    this.audioService.audio.pause();
    this.playing = false;
  }

  showPause(id: string) {
    if (this.current !== id) {
      return false;
    }
    if (this.current === id && this.playing) {
      return true;
    }
    return false;
  }

  showPlay(id: string) {
    if (this.current !== id) {
      return true;
    }
    if (this.current === id && !this.playing) {
      return true;
    }
    return false;
  }

  download(presetId: string) {
    return window.open('http://localhost:3001/api/presetfile/' + presetId);
  }

}
