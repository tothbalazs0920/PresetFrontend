import { Component } from '@angular/core';
import { AudioService } from './../audio-player/audio.service';
import { environment } from './../../../environments/environment';
import { AwsService } from './../aws/aws.service';

@Component({
  selector: 'app-preset-list'
})

export class PresetListComponent {
  playing = false;
  current?: string;

  constructor(
    protected audioService: AudioService,
    protected awsService: AwsService) {
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

  download(presetFileId: string) {
    return window.open('https://s3-eu-west-1.amazonaws.com/guitar-tone-finder-presets/' + presetFileId);
  }

}
