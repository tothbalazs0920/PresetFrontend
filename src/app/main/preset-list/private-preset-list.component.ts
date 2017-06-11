import { Component, OnInit } from '@angular/core';
import { AuthService } from './../user/auth.service';
import { Preset } from './../preset/preset';
import { PresetService } from './../preset/preset.service';
import { AudioService } from './../audio-player/audio.service';
import { PresetListComponent } from './preset-list.component';
import * as _ from 'underscore';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-private-preset-list',
    templateUrl: 'private-preset-list.component.html',
    styleUrls: ['preset-list.component.css']
})
export class PrivatePresetListComponent extends PresetListComponent implements OnInit {
    presets: Preset[];

    constructor(
        private presetService: PresetService,
        private authService: AuthService,
        private AudioService: AudioService,
        private router: Router) {
        super(AudioService);
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
        this.router.navigate(['/edit/' + presetId ]);
    }
}
