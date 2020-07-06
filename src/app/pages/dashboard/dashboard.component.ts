import { Component, OnInit } from '@angular/core';
import { ThumbItemModel } from '../../@theme/components/thumb-item/ThumbItemModel';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  messages: any[] = [];
  lastId = 0;

  data: ThumbItemModel[] = [];

  constructor(private service: DashboardService) {

  }

  async ngOnInit() {
    let result = await this.service.Get();
    result.forEach(r => {
      this.data.push({
        mainPictureUrl: "https://img.youtube.com/vi/" + r.mediaId + "/hqdefault.jpg",
        secondaryPictureUrl: "https://img.youtube.com/vi/" + r.mediaId + "/hqdefault.jpg",
        primaryDescription: r.title,
        secondaryDescription: r.channelTitle,
        link: "/player/" + r.channelId
      });
    });
  }
}