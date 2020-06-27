import { Component, OnInit } from '@angular/core';
import { ChannelService } from './channel-services/channel.service';

@Component({
  selector: 'channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss']
})
export class ChannelListComponent implements OnInit {

  constructor(private service: ChannelService) { }

  channels: any[] = [];

  async ngOnInit() {
    await this.update();
  }

  async update() {
    this.channels = await this.service.GetAll();
  }
}
