import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'audio-player',
  templateUrl: 'audio-player.component.html',
  styleUrls: ['audio-player.component.css']
})

export class AudioPlayer {
  @Input() showPause;
  @Input() showPlay;
  @Output() play = new EventEmitter();
  @Output() pause = new EventEmitter();
}
