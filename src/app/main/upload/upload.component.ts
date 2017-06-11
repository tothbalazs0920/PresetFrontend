import { Component, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Preset } from './../preset/preset';
import { AuthService } from './../user/auth.service'
import { PresetService } from './../preset/preset.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
    selector: 'simple-upload',
    templateUrl: './upload.component.html'
})
export class UploadComponent {
    preset: Preset;
    private URL = 'http://localhost:3001/api/upload';
    private presetUploadUrl = 'http://localhost:3001/api/presetfile/upload';
    public uploader: FileUploader;
    public presetUploader: FileUploader;
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;
    @ViewChild('myModal')
    modal: ModalComponent;
    technologies = ['Kemper', 'Axe Fx II', 'AX8', 'FX-8', 'Helix', 'G-system', 'Bias'];

    constructor(
        private authService: AuthService,
        private presetService: PresetService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
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
            email: ''
        };
        this.activatedRoute
            .params
            .flatMap(
            params => {
                this.preset = new Preset();               
                this.preset._id = this.objectId();
                if (params['id']) {
                    return this.presetService.getPreset(params['id']);
                } else {
                    return Observable.of(this.preset);
                }
            }).subscribe(result => {
                if (result) {
                    this.preset = result;
                } 
            });

        this.uploader = new FileUploader({ url: this.URL });
        this.uploader.onAfterAddingFile = () => this.onUploaderAfterAddingFile();
        this.uploader.onWhenAddingFileFailed = () => this.onUploaderWhenAddingFileFailed();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.preset.audioFileId = JSON.parse(response).filename;
            this.preset.originalAudoFileName = JSON.parse(response).originalname;
        };

        this.presetUploader = new FileUploader({ url: this.presetUploadUrl });
        this.presetUploader.onAfterAddingFile = () => {
            this.presetUploader.queue[0].alias = 'presetFile';
            this.presetUploader.queue[0].upload();
        };
        this.presetUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log(JSON.parse(response).filename);
            this.preset.presetId = JSON.parse(response).filename;
            this.preset.originalPerestFileName = JSON.parse(response).originalname;
        };
    }
    
    // generate mongo db id
    objectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
                    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

    onUploaderAfterAddingFile(): void {
        this.uploader.queue[0].upload();
    }

    onUploaderWhenAddingFileFailed(): void { }

    save(): void {
        this.presetService.savePreset(this.preset)
            .then(x => {
                this.modal.open();
                setTimeout(() => this.modal.close(), 600);
                setTimeout(() => this.router.navigate(['/profile']), 700);;
            });
    }
}
