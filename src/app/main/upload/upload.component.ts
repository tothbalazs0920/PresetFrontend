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
declare var amplitude: any;
import { CheckoutService } from './../checkout/checkout.service';

@Component({
    selector: 'simple-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['upload.component.css']
})
export class UploadComponent {
    preset: Preset;
    public uploader: FileUploader;
    public presetUploader: FileUploader;
    public imageUploader: FileUploader;
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;
    @ViewChild('myModal')
    modal: ModalComponent;
    technologies = ['Kemper', 'Axe Fx II', 'AX8', 'Helix', 'Bias'];
    currenceis = ['usd', 'eur', 'dkk'];
    connectedToStripe;
    optional = false;

    constructor(
        private CustomAuthService: CustomAuthService,
        private presetService: PresetService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private awsService: AwsService,
        private checkoutService: CheckoutService) {
    }

    ngOnInit(): void {
        amplitude.init(environment.amplitudeApiKey);
        amplitude.getInstance().logEvent('loaded-upload' + environment.postFix);
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

        this.checkoutService.isStripeConnected()
        .then((result) => {
            if (result._body === 'true') {
                this.connectedToStripe = true;
            }
        }).catch((err) => {
            console.log(err);
        });

        this.activatedRoute
            .params
            .flatMap(
            params => {
                this.preset = new Preset();
                this.preset._id = this.objectId();
                this.preset.technology = 'Kemper';
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
            this.awsService.getPresignedUrl(s3Name, type, 'preset', 'putObject')
                .then(response => {
                    this.presetUploader.setOptions({
                        headers: [
                            { name: 'Content-Type', value: type },
                            { name: 'Content-Disposition', value: 'filename=' + this.preset.originalPerestFileName }
                        ]
                    });
                    this.presetUploader.queue[0].url = response.signedRequest;
                    this.presetUploader.queue[0].method = 'PUT';
                    this.presetUploader.queue[0].upload();
                });
        };

        this.imageUploader = new FileUploader({ url: '', disableMultipart: true });
        this.imageUploader.onAfterAddingFile = () => {
            const s3Name = this.generateUUID();
            this.preset.imageFileId = s3Name;
            this.preset.originalImageFileName = this.imageUploader.queue[0].file.name;;
            let type = this.imageUploader.queue[0].file.type;
            this.imageUploader.queue[0].alias = 'image';
            this.awsService.getPresignedUrl(s3Name, type, 'image', 'putObject')
                .then(response => {
                    this.imageUploader.setOptions({
                        headers: [
                            { name: 'Content-Type', value: type },
                            { name: 'Content-Disposition', value: 'filename=' + this.preset.originalImageFileName }
                        ]
                    });
                    this.imageUploader.queue[0].url = response.signedRequest;
                    this.imageUploader.queue[0].method = 'PUT';
                    this.imageUploader.queue[0].upload();
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
        this.awsService.getPresignedUrl(s3Name, type, 'mp3', 'putObject')
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
            .then((preset) => {
                amplitude.getInstance().logEvent('clicked-save' + environment.postFix, { id: this.preset._id });
                this.modal.open();
                setTimeout(() => this.modal.close(), 600);
                setTimeout(() => this.router.navigate(['/preset', preset._id]), 700);;
            });
    }

    redirectToStripe() {
        // localStorage.setItem("stripeState", );
        window.location.href=
            'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=' +
            environment.stripeClientId + '&scope=read_write';
    }

    public setTechnology(technology: string): void {
        this.preset.technology = technology;
    }
}
