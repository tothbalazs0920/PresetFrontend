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


  constructor(
    protected audioService: AudioService,
    protected awsService: AwsService) {
  }

  ngOnInit(): void {
    amplitude.init('7303a1f3cd3faa5eaa7d2ebd58da1648');
  }

  handlePlay(_id: string, audioFileId: number) {
    amplitude.getInstance().logEvent('clicked-play', {'audioFileId': audioFileId, 'es_id':'_id'});
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

  download(presetFileId: string, _id: string) {
    amplitude.getInstance().logEvent('clicked-download', {'presetFileId': presetFileId, 'es-id':'_id'});
    return window.open('https://s3-eu-west-1.amazonaws.com/guitar-tone-finder-presets/' + presetFileId);
  }

}
