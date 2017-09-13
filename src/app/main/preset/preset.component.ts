import { Component, OnInit } from '@angular/core';

import { Preset } from './../preset/preset';
import { PresetService } from './../preset/preset.service';
import { AudioService } from './../audio-player/audio.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';
import 'rxjs/add/operator/catch';
import { DomSanitizer } from '@angular/platform-browser';
declare var amplitude: any;
import { environment } from './../../../environments/environment';

@Component({
    selector: 'preset',
    templateUrl: 'preset.component.html',
    styleUrls: ['preset.component.css']
})
export class PresetComponent implements OnInit {
    public preset: Preset;
    imageBaseUrl = 'https://s3-eu-west-1.amazonaws.com/guitar-tone-finder-images' + environment.s3Postfix + '/';
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
            ampChannel: '',
            pickupType: '',
            michrophone: '',
            michrophonePosition: '',
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
            youtubeUrl: '',
            created: null
        };
        this.activatedRoute.params.subscribe(params => {
            if (params['id']) {
                this.presetService.getPreset(params['id'])
                    .subscribe((preset) => {
                        this.preset = preset;
                        amplitude.init(environment.amplitudeApiKey, null, { includeReferrer: true });
                        amplitude.getInstance().logEvent('loaded-preset' + environment.postFix, { 'id': this.preset._id, 'presetFileId': this.preset.presetId });
                    },
                    (err) => {
                        console.log(err)
                    });
            }
        });

    }

    handlePlay(audioFileId: number) {
        amplitude.getInstance().logEvent('clicked-play' + environment.postFix, { 'audioFileId': audioFileId, 'id': this.preset._id, component: 'preset' });
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
        amplitude.getInstance().logEvent('clicked-download' + environment.postFix, { 'presetFileId': presetFileId, 'id': this.preset._id, 'component': 'preset' });
        return window.open('https://s3-eu-west-1.amazonaws.com/guitar-tone-finder-presets' + environment.s3Postfix + '/' + presetFileId);
    }

    getEmbeddedUrl(id: string) {
        return 'http://www.youtube.com/embed/' + id;
    }

    getImageUrl(imagageId: string) {
        if (imagageId) {
            return this.imageBaseUrl + imagageId;
        }
        return 'https://www.shareicon.net/data/128x128/2016/05/13/764563_music_512x512.png';
    }

}
