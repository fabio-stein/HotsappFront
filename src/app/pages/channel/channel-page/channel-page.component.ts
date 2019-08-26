import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'channel-page',
  templateUrl: './channel-page.component.html',
  styleUrls: ['./channel-page.component.scss']
})
export class ChannelPageComponent implements OnInit {
  Channel: number;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get("channelId");
      console.log("CHANNEL ID: " + id)
      this.id = Number.parseInt(id);
      this.Channel = this.id;
      let base_route = '/pages/channel/' + id;
      this.tabs.push({
        title: 'Home',
        route: base_route + '/home',
      })
    });
  }
  id: number;

  ngOnInit() {
  }

  tabs: any[] = [
  ];

}
