import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from '../../channel.service';
import { ActionChannelSearch } from '../../channel-search/action/ActionChannelSearch';
import { ChannelViewModel } from '../ChannelViewModel';

@Component({
  selector: 'channel-list',
  templateUrl: './channel-list.component.html',
})
export class ChannelListComponent implements OnInit {
  news = [];
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;
  isLast = false;

  @Input()
  filter: ActionChannelSearch;

  @Input()
  showDashboardOption: boolean;

  constructor(private _service: ChannelService) {

  }

  onFilterUpdate() {
    this.Channels = [];
    this.pageToLoadNext = 1;
    this.isLast = false;
    this.loadNext();
  }

  loadNext() {
    if (this.loading) { return; }
    if (this.isLast) { return; }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);
    this.filter.page = this.pageToLoadNext;
    this._service.Search(this.filter).then(data => {
      this.Channels.push(...data);
      this.placeholders = [];
      this.loading = false;
      this.pageToLoadNext++;
      if (data.length == 0) {
        this.isLast = true;
      }
    });
  }



  Channels: ChannelViewModel[] = [

  ];

  ngOnInit() {
  }

}
