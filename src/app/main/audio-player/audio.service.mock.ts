import { AudioService } from "../audio-player/audio.service";

export class AudioServiceMock extends AudioService {

    constructor() {
        super(null);
    }

    load(audioFileId) {
    }

    play(audioFileId) {
    }
}