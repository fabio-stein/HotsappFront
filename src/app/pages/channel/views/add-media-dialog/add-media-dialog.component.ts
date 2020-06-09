import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject, Observable } from 'rxjs';
import { AddMediaDialogOptions, AddMediaDialogResult } from './add-media-dialog.service';

@Component({
  selector: 'add-media-dialog',
  templateUrl: './add-media-dialog.component.html',
  styleUrls: ['./add-media-dialog.component.scss']
})
export class AddMediaDialogComponent implements OnInit {
  Options: AddMediaDialogOptions;

  OnConfirm$: Subject<AddMediaDialogResult> = new Subject();
  public OnConfirm: Observable<AddMediaDialogResult> = this.OnConfirm$.asObservable();

  OnCancel$: Subject<any> = new Subject();
  public OnCancel: Observable<any> = this.OnCancel$.asObservable();

  submitted = false;
  error = false;
  message = "";
  sourceUrl: string = "https://www.youtube.com/watch?v=HqqrcuBUMSY";


  checkSendPlaylist = false;

  constructor(protected dialgoRef: NbDialogRef<AddMediaDialogComponent>) { }

  ngOnInit() {
  }

  onSubmit() {
    this.dialgoRef.close();
    this.OnConfirm$.next({ mediaUrl: this.sourceUrl, addToPlaylist: this.checkSendPlaylist });
    this.OnConfirm$.complete();
  }

  cancelClick() {
    this.dialgoRef.close();
    this.OnCancel$.next();
    this.OnCancel$.complete();
  }
}