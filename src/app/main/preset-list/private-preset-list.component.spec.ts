import { PrivatePresetListComponent } from "./private-preset-list.component";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { PresetService } from "../preset/preset.service";
import { PresetServiceMock } from "../preset/preset.service.mock";
import { AudioService } from "../audio-player/audio.service";
import { AudioServiceMock } from "../audio-player/audio.service.mock";
import { AuthService } from "../user/auth.service";
import { AuthServiceMock } from "../user/auth.service.mock";
import { PresetList } from './preset-list.interface';
import { Preset } from './../preset/preset';
import { AudioPlayer } from './../audio-player/audio-player.component';
import Spy = jasmine.Spy;
import * as data from './data.mock.json';

describe('PrivatePresetListComponent', () => {
    let component: PrivatePresetListComponent;
    let fixture: ComponentFixture<PrivatePresetListComponent>;
    let spy;
    let audioServiceMock;
    let presets = data;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AudioPlayer,
                PrivatePresetListComponent
            ],
            providers: [
                { provide: PresetService, useClass: PresetServiceMock },
                { provide: AuthService, useClass: AuthServiceMock },
                { provide: AudioService, useClass: AudioServiceMock }
            ]
        }).compileComponents()
            .then(() => {
                    fixture = TestBed.createComponent(PrivatePresetListComponent);
                    component = fixture.componentInstance;
                    let presetService = fixture.debugElement.injector.get(PresetService);
                    spyOn(presetService, 'getPersonalPresets').and.returnValue(Observable.of(presets));
            });
    }));

    it('should display presets', async(() => {
        component.ngOnInit();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            let debugElements = fixture.debugElement.queryAll(By.css('.panel-body'));
            expect(debugElements.length).toBe(2);
        });
    }));

    it('should set current and playing fields when play button is clicked', () => {
        component.ngOnInit();
        fixture.detectChanges();
        let playButtons: DebugElement[] = fixture.debugElement.queryAll(By.css('.fa-play'));
        playButtons[0].nativeElement.click();
        fixture.detectChanges();
        expect(component.current).toBe(presets[0]._id);
        expect(component.playing).toBe(true);
    });
});
