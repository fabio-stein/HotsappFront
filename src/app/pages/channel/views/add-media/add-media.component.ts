import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChannelService } from '../../channel.service';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { Observable, Subject } from 'rxjs';
import { AddMediaDialogOptions } from './add-media-dialog-options';

@Component({
  selector: 'add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {
  Options: AddMediaDialogOptions;

  OnUpdate$: Subject<any> = new Subject();
  OnUpdate: Observable<any> = this.OnUpdate$.asObservable();

  submitted = false;
  error = false;
  message = "";
  sourceUrl: string = "https://www.youtube.com/watch?v=HqqrcuBUMSY";


  checkSendPlaylist = false;

  constructor(protected dialgoRef: NbDialogRef<AddMediaComponent>, private service: ChannelService, private toastr: NbToastrService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.service.AddMedia({
      channel: this.Options.Channel,
      addToPlaylist: this.checkSendPlaylist,
      source: this.sourceUrl,
      title: null
    }).then(d => {
      this.toastr.success("Media successfully added!", "Add Media");
      this.dialgoRef.close();
    }).catch(e => {
      console.log(e);
    }).then(d => {
      this.submitted = false;
      this.OnUpdate$.next();
    })
  }
}
