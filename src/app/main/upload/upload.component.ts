import { Component, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Preset } from './../preset/preset';
import { CustomAuthService } from './../user/auth.service'
import { PresetService } from './../preset/preset.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { environment } from './../../../environments/environment';
import { AwsService } from './../aws/aws.service';

@Component({
    selector: 'simple-upload',
    templateUrl: './upload.component.html'
})
export class UploadComponent {
    preset: Preset;
    public uploader: FileUploader;
    public presetUploader: FileUploader;
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;
    @ViewChild('myModal')
    modal: ModalComponent;
    technologies = ['Kemper', 'Axe Fx II', 'AX8', 'FX-8', 'Helix', 'G-system', 'Bias'];

    constructor(
        private CustomAuthService: CustomAuthService,
        private presetService: PresetService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private awsService: AwsService) {
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

        this.uploader = new FileUploader({ url: '', disableMultipart: true });
        this.uploader.onAfterAddingFile = () => this.onUploaderAfterAddingFile();
        this.uploader.onWhenAddingFileFailed = () => this.onUploaderWhenAddingFileFailed();

        this.presetUploader = new FileUploader({ url: '', disableMultipart: true });
        this.presetUploader.onAfterAddingFile = () => {
            const s3Name = this.generateUUID();
            this.preset.presetId = s3Name;
            this.preset.originalPerestFileName = this.presetUploader.queue[0].file.name;;
            let type = this.presetUploader.queue[0].file.type;
            this.presetUploader.queue[0].alias = 'presetFile';
            this.awsService.getPresignedUrl(s3Name, type, false, 'putObject')
                .then(response => {
                    this.presetUploader.setOptions({ headers: [
                        { name: 'Content-Type', value: type },
                        { name: 'Content-Disposition', value: 'filename=' +  this.preset.originalPerestFileName }
                    ] });
                    this.presetUploader.queue[0].url = response.signedRequest;
                    this.presetUploader.queue[0].method = 'PUT';
                    this.presetUploader.queue[0].upload();
                });
        };
    }

    // generate mongo db id
    objectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
        s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

    private generateUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    onUploaderAfterAddingFile(): void {
        const s3Name = this.generateUUID() + '.mp3';
        this.preset.audioFileId = s3Name;
        this.preset.originalAudoFileName = this.uploader.queue[0].file.name;
        this.uploader.queue[0].file.name = s3Name;
        let type = this.uploader.queue[0].file.type;
        this.awsService.getPresignedUrl(s3Name, type, true, 'putObject')
            .then(response => {
                this.uploader.setOptions({ headers: [{ name: 'Content-Type', value: type }] });
                this.uploader.queue[0].url = response.signedRequest;
                this.uploader.queue[0].method = 'PUT';
                this.uploader.queue[0].upload();
            });
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
