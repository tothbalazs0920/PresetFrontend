/*
import { PrivatePresetListComponent } from './private-preset-list.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { PresetService } from '../preset/preset.service';
import { PresetServiceMock } from '../preset/preset.service.mock';
import { AudioService } from '../audio-player/audio.service';
import { AudioServiceMock } from '../audio-player/audio.service.mock';
import { CustomAuthService } from '../user/auth.service';
import { CustomAuthServiceMock } from '../user/auth.service.mock';
import { PresetList } from './preset-list.interface';
import { Preset } from './../preset/preset';
import 'rxjs/add/operator/map';
import * as data from './data.mock.json';

describe('Private preset list unit test', () => {
    let privatePresetListComponent: PrivatePresetListComponent;
    let presetService: PresetService;
    let CustomAuthService: CustomAuthService;
    let audioService: AudioService;
    let presets = data;

    beforeEach(() => {
        presetService = new PresetServiceMock();
        spyOn(presetService, 'getPersonalPresets').and.returnValue(Observable.of(presets));
        CustomAuthService = new CustomAuthServiceMock();
        audioService = new AudioServiceMock();
        privatePresetListComponent = new PrivatePresetListComponent(presetService, CustomAuthService, audioService);
    });

    it('populates presets on ngOninit', () => {
        privatePresetListComponent.ngOnInit();
        expect(privatePresetListComponent.presets.length).toBe(2);
    });
});
*/
