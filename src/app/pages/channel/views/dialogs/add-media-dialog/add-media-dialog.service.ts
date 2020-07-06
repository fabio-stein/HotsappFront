import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AddMediaDialogComponent } from './add-media-dialog.component';

@Injectable()
export class AddMediaDialogService {
    constructor(private dialog: NbDialogService) {

    }

    async StartDialogAsync(): Promise<AddMediaDialogResult> {
        return new Promise((res, rej) => {
            let ref = this.dialog.open(AddMediaDialogComponent, { context: {}, closeOnBackdropClick: false, closeOnEsc: false });
            ref.componentRef.instance.OnConfirm.subscribe(async e => {
                res(e);
            })
            ref.componentRef.instance.OnCancel.subscribe(async e => {
                res(null);
            })
        })
    }
}

export class AddMediaDialogResult {
    mediaUrl: string;
    addToPlaylist: boolean;
}

export class AddMediaDialogOptions {
    Channel: number;
}