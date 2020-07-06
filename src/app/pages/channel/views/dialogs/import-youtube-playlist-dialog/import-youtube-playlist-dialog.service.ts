import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ImportYouTubePlaylistDialogComponent } from './import-youtube-playlist-dialog.component';

@Injectable()
export class ImportYouTubePlaylistDialogService {
    constructor(private dialog: NbDialogService) {

    }

    async StartDialogAsync(): Promise<ImportYouTubePlaylistDialogResult> {
        return new Promise((res, rej) => {
            let ref = this.dialog.open(ImportYouTubePlaylistDialogComponent, { context: {}, closeOnBackdropClick: false, closeOnEsc: false });
            ref.componentRef.instance.OnConfirm.subscribe(async e => {
                res(e);
            })
            ref.componentRef.instance.OnCancel.subscribe(async e => {
                res(null);
            })
        })
    }
}

export class ImportYouTubePlaylistDialogResult {
    mediaUrl: string;
    addToPlaylist: boolean;
}

export class ImportYouTubePlaylistDialogOptions {
    Channel: number;
}