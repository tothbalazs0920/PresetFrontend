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
    selector: 'app-private-preset-list',
    templateUrl: 'private-preset-list.component.html',
    styleUrls: ['preset-list.component.css']
})
export class PrivatePresetListComponent extends PresetListComponent implements OnInit {
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
        this.presetService.getPersonalPresets()
            .subscribe(presets => this.presets = presets);
    }

    deletePreset(presetId: string): void {
        this.presetService.deletePreset(presetId)
            .then(x => {
                this.presets = _(this.presets)
                    .filter(function (item) {
                        return item._id !== presetId;
                    });
            });
    }

    editPreset(presetId: string): void {
        this.router.navigate(['/edit/' + presetId]);
    }
}
