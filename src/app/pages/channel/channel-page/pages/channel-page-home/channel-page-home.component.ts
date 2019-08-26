import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'channel-page-home',
  templateUrl: './channel-page-home.component.html',
  styleUrls: ['./channel-page-home.component.scss']
})
export class ChannelPageHomeComponent implements OnInit {

  Channel: number;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get("channelId");
      this.Channel = Number(id);
    });
  }

  ngOnInit() {
  }

}
