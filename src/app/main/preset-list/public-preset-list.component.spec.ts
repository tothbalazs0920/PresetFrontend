/*
import { PublicPresetListComponent } from "./public-preset-list.component";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import { PresetService } from "../preset/preset.service";
import { AudioService } from "../audio-player/audio.service";
import { AuthService } from "../user/auth.service";
import { PresetList } from './preset-list.interface';
import { Preset } from './../preset/preset';

describe('PublicPresetListComponent', () => {

    let comp: PublicPresetListComponent;
    let fixture: ComponentFixture<PublicPresetListComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PublicPresetListComponent], // declare the test component
            providers: [
                { AudioService },
                { PresetService },
                { AuthService },
                { Router },
                { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'pageNumber': 1 }]) } },
            ]
        });

        fixture = TestBed.createComponent(PublicPresetListComponent);
        comp = fixture.componentInstance;


        let presetService = fixture.debugElement.injector.get(PresetService);

        let presetList: PresetList<Preset>;
        presetList.presets.push(new Preset());

        spy = spyOn(presetService, 'getSearchResult')
            .and.returnValue(Observable.of(presetList));

        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;
    });

    it('should not show quote before OnInit', () => {
        debugger;
        expect(el.textContent).toBe('', 'nothing displayed');
        expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
    });
});

*/
