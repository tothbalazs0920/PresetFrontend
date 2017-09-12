import { Component, OnInit } from '@angular/core';
import { AudioService } from './../audio-player/audio.service';
import { environment } from './../../../environments/environment';
import { AwsService } from './../aws/aws.service';
declare var amplitude: any;

@Component({
  selector: 'app-preset-list'
})

export class PresetListComponent implements OnInit {
  playing = false;
  current?: string;
  imageBaseUrl = 'https://s3-eu-west-1.amazonaws.com/guitar-tone-finder-images/';

  constructor(
    protected audioService: AudioService,
    protected awsService: AwsService) {
  }

  ngOnInit(): void {
    amplitude.init(environment.amplitudeApiKey);
  }

  handlePlay(_id: string, audioFileId: number, component: string) {
    amplitude.getInstance().logEvent('clicked-play' + environment.postFix, { 'audioFileId': audioFileId, 'id': _id, component: component });
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

  download(presetFileId: string, _id: string, component: string) {
    amplitude.getInstance().logEvent('clicked-download' + environment.postFix, { 'presetFileId': presetFileId, 'id': _id, 'component': component });
    return window.open('https://s3-eu-west-1.amazonaws.com/guitar-tone-finder-presets/' + presetFileId);
  }

  getImageUrl(imagageId: string) {
    if (imagageId) {
      return this.imageBaseUrl + imagageId;
    }
    return 'https://www.shareicon.net/data/128x128/2016/05/13/764563_music_512x512.png';
  }

}
