import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AppPlayerComponent } from '../app-player/app-player.component';
import { WebStreamerService } from '../web-streamer/web-streamer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'external-player',
  templateUrl: './external-player.component.html',
  styleUrls: ['./external-player.component.scss']
})

export class ExternalPlayerComponent implements OnInit {
  @ViewChild(AppPlayerComponent, null) player: AppPlayerComponent;
  channelId: string;
  StreamerService: WebStreamerService;
  constructor(private route: ActivatedRoute) {
  }

  ngAfterViewInit() {

  }

  async ngOnInit() {
    this.channelId = this.route.snapshot.paramMap.get('id');

    this.StreamerService = new WebStreamerService("http://localhost:5000/streamhub?channelId=" + this.channelId);

    await this.player.initialize("U03lLvhBzOw",
      "https://img.youtube.com/vi/KWjV25q34Hw/hqdefault.jpg")
    //await this.player.playVideo("U03lLvhBzOw", 20);
    try {
      await this.StreamerService.Connect();
    } catch (e) {
      alert("Failed to connect: " + e);
    }
    this.StreamerService.OnPlayEvent.subscribe(data => {
      let now = new Date();
      let start = new Date(data.startDateUTC);
      let diff = Math.ceil((now.getTime() - start.getTime()) / 1000);

      if (diff > data.duration) {
        console.log("Media already ended, waiting next");
        return;
      }
      if (diff < 0) {
        console.log("Invalid media start date or system date");
      }

      console.log("DIFF: " + diff);
      this.player.playVideo(data.mediaId, diff);
      console.log("PlayEvent Received: " + data.mediaId);
    })
  }

  ngOnDestroy() {
  }

}
