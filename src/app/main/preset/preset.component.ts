import { Component, OnInit, ViewChild } from '@angular/core';

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
import { CheckoutService } from './../checkout/checkout.service';
import { CustomAuthService } from './../user/auth.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'preset',
    templateUrl: 'preset.component.html',
    styleUrls: ['preset.component.css', './../preset-list/preset-list.component.css']
})
export class PresetComponent implements OnInit {
    public preset: Preset;
    imageBaseUrl = 'https://s3-eu-west-1.amazonaws.com/guitar-tone-finder-images' + environment.s3Postfix + '/';
    playing = false;
    downloadable = false;
    @ViewChild('loginModal')
    modal: ModalComponent;

    constructor(
        private audioService: AudioService,
        private presetService: PresetService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private checkoutService: CheckoutService,
        private CustomAuthService: CustomAuthService
    ) { }

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
        this.activatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.presetService.getPreset(params['id'])
                    .subscribe((preset) => {
                        this.preset = preset;
                        if (this.CustomAuthService.loggedIn()) {
                            if (preset.email === this.CustomAuthService.getEmail()) {
                                this.downloadable = true;
                            }
                            this.presetService.isPresetDownLoaded(preset._id).subscribe((result) => {
                                if (result) {
                                    this.downloadable = true;
                                }
                            });
                        }
                        amplitude.init(environment.amplitudeApiKey, null, { includeReferrer: true });
                        amplitude.getInstance().logEvent('loaded-preset' + environment.postFix, { 'id': this.preset._id, 'presetFileId': this.preset.presetId });
                    },
                    (err) => {
                        console.log(err)
                    });
            }
        });
    }

    handlePlay(_id: string, audioFileId: number, component: string) {
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

    buy() {
        this.checkoutService.openCheckout(this.preset.name, this.preset.price * 100, this.preset.currency, (token: any) => {
            this.checkoutService.takePayment(this.preset.price * 100, this.preset.currency,
                this.preset._id, this.preset.email, token).then((result) => {
                    if (result.success) {
                        this.downloadable = true;
                    }
                }).catch((error) => {
                    this.downloadable = false;
                    console.log(error.message);
                });
        });
    }

    redirect() {
        window.location.href = environment.apiRoot + '/auth/google';
    }
}
