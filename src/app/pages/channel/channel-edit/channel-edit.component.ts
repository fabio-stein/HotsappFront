import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from '../channel.service';
import { ChannelEditModel } from './model/ChannelEditModel';

@Component({
  selector: 'channel-edit',
  templateUrl: './channel-edit.component.html',
  styleUrls: ['./channel-edit.component.scss']
})
export class ChannelEditComponent implements OnInit {
  id: string;
  isNew = true;
  submitted = false;

  Channel: ChannelEditModel = {
    Id: null,
    Name: "TEST CHANNEL"
  };

  constructor(private activatedRoute: ActivatedRoute,
    private _service: ChannelService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get("id");
      this.isNew = this.id == null;
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    this._service.Create(this.Channel)
      .then(data => {
        console.log("ALWAYS");
      })
      .catch(err => {
        console.error(err);
      })
      .then(() => {
        this.submitted = false;
      })
  }

}
