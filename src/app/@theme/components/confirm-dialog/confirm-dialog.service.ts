import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {
    constructor(private dialog: NbDialogService) {

    }

    async ConfirmAsync(title, message): Promise<boolean> {
        return new Promise((res, rej) => {
            let ref = this.dialog.open(ConfirmDialogComponent, { context: { Title: title, Content: message }, closeOnBackdropClick: false, closeOnEsc: false });
            ref.componentRef.instance.OnConfirm.subscribe(async e => {
                res(true);
            })
            ref.componentRef.instance.OnCancel.subscribe(async e => {
                res(false)
            })
        })
    }
}