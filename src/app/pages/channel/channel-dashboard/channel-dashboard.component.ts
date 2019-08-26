import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'channel-dashboard',
  templateUrl: './channel-dashboard.component.html',
  styleUrls: ['./channel-dashboard.component.scss']
})
export class ChannelDashboardComponent implements OnInit {

  Channel: number;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get("channelId");
      console.log("CHANNEL ID: " + id)
      this.id = Number.parseInt(id);
      this.Channel = this.id;
      let base_route = '/pages/dashboard/' + id;

      this.tabs.push({
        title: 'Dashboard',
        route: base_route + '/dashboard',
      })

      this.tabs.push({
        title: 'Playlist',
        route: base_route + '/playlist',
      })

      this.tabs.push({
        title: 'Media',
        route: base_route + '/media',
      })

      this.tabs.push({
        title: 'Configuration',
        route: base_route + '/config',
      })
    });
  }
  id: number;

  ngOnInit() {
  }

  tabs: any[] = [
  ];
}
