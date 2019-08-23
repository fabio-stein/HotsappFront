import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionChannelSearch } from './action/ActionChannelSearch';
import { Subject } from 'rxjs';
import { ChannelListComponent } from '../views/channel-list/channel-list.component';
import { ChannelViewModel } from '../views/ChannelViewModel';

@Component({
  selector: 'channel-search',
  templateUrl: './channel-search.component.html',
  styleUrls: ['./channel-search.component.scss'],
})
export class ChannelSearchComponent implements OnInit {
  @ViewChild(ChannelListComponent, null) listComponent: ChannelListComponent;

  filter: ActionChannelSearch = {

  };
  channels: ChannelViewModel[];

  modelChanged: Subject<string> = new Subject<string>();

  constructor() {

  }
  ngOnInit() {
  }

  update() {
    this.listComponent.onFilterUpdate();
  }

  onTabChange(e) {
    //Use badgeStatus property to simulate id
    switch (e.badgeStatus) {
      case 'app-all':
        this.filter.Mine = null;
        break;
      case 'app-mine':
        this.filter.Mine = true;
        break;
    }
    this.update();
  }
}
