import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject, Observable } from 'rxjs';
import { ImportYouTubePlaylistDialogOptions, ImportYouTubePlaylistDialogResult } from './import-youtube-playlist-dialog.service';

@Component({
  selector: 'import-youtube-playlist-dialog',
  templateUrl: './import-youtube-playlist-dialog.component.html',
  styleUrls: ['./import-youtube-playlist-dialog.component.scss']
})
export class ImportYouTubePlaylistDialogComponent implements OnInit {
  Options: ImportYouTubePlaylistDialogOptions;

  OnConfirm$: Subject<ImportYouTubePlaylistDialogResult> = new Subject();
  public OnConfirm: Observable<ImportYouTubePlaylistDialogResult> = this.OnConfirm$.asObservable();

  OnCancel$: Subject<any> = new Subject();
  public OnCancel: Observable<any> = this.OnCancel$.asObservable();

  submitted = false;
  error = false;
  message = "";
  sourceUrl: string;


  checkSendPlaylist = true;

  constructor(protected dialgoRef: NbDialogRef<ImportYouTubePlaylistDialogComponent>) { }

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