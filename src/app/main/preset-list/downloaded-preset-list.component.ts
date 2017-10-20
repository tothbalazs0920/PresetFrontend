import { Component, OnInit } from '@angular/core';
import { CustomAuthService } from './../user/auth.service';
import { Preset } from './../preset/preset';
import { PresetService } from './../preset/preset.service';
import { AudioService } from './../audio-player/audio.service';
import { PresetListComponent } from './preset-list.component';
import * as _ from 'underscore';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AwsService } from './../aws/aws.service';

@Component({
    selector: 'app-downloaded-preset-list',
    templateUrl: 'downloaded-preset-list.component.html',
    styleUrls: ['preset-list.component.css']
})
export class DownloadedPresetListComponent extends PresetListComponent implements OnInit {
    presets: Preset[];

    constructor(
        protected presetService: PresetService,
        private CustomAuthService: CustomAuthService,
        private AudioService: AudioService,
        private router: Router,
        protected awsService: AwsService) {
        super(AudioService, awsService, presetService);
    }

    ngOnInit(): void {
        if (this.CustomAuthService.loggedIn()) {
            this.presetService.getDownloadedPreset()
                .subscribe(presets =>
                    this.presets = presets,
                err => console.log(err));
        }

    }
}
