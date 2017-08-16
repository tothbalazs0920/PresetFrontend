import { Component, OnInit } from '@angular/core';

import { Preset } from './../preset/preset';
import { PresetService } from './../preset/preset.service';
import { AudioService } from './../audio-player/audio.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';
import { environment } from './../../../environments/environment';
import 'rxjs/add/operator/catch';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'preset',
    templateUrl: 'preset.component.html',
    styleUrls: ['preset.component.css']
})
export class PresetComponent implements OnInit {
    public preset: Preset;
    imageBaseUrl = 'https://s3-eu-west-1.amazonaws.com/guitar-tone-finder-images/'
    playing = false;

    constructor(
        private audioService: AudioService,
        private presetService: PresetService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) {

    }

    ngOnInit(): void {
        this.preset = {
            _id: '',
            name: '',
            technology: '',
            description: '',
            genre: [],
            numberOfDownLoads: 0,
            amp: '',
            cabinet: '',
            michrophones: [],
            presetAuthor: '',
            lead: true,
            clean: true,
            rythm: false,
            author: '',
            album: '',
            songTitle: '',
            originalPerestFileName: '',
            presetId: '',
            img: '',
            profilePicture: '',
            price: 0,
            currency: '',
            audioFileId: '',
            originalAudoFileName: '',
            email: '',
            imageFileId: '',
            originalImageFileName: '',
            youtubeUrl: ''
        };
        this.activatedRoute.params.subscribe(params => {
            if (params['id']) {
                this.presetService.getPreset(params['id'])
                    .subscribe((preset) => {
                        this.preset = preset;
                    },
                    (err) => {
                        console.log(err)
                    });
            }
        });
    }

    handlePlay(audioFileId: number) {
        this.audioService.play(audioFileId);
        this.playing = true;
    }

    handlePause() {
        this.audioService.audio.pause();
        this.playing = false;
    }

    showPause() {
        return this.playing;
    }

    showPlay(id: string) {
        return !this.playing;
    }

    download(presetFileId: string) {
        return window.open('https://s3-eu-west-1.amazonaws.com/guitar-tone-finder-presets/' + presetFileId);
    }

    getEmbeddedUrl(id: string) {
     return 'http://www.youtube.com/embed/' + id;
    }

}
