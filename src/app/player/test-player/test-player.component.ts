import { Component, OnInit, ViewChild } from '@angular/core';
import { AppPlayerComponent } from '../app-player/app-player.component';
import { WebStreamerService } from '../services/web-streamer/web-streamer.service';

@Component({
  selector: 'test-player',
  templateUrl: './test-player.component.html',
  styleUrls: ['./test-player.component.scss']
})
export class TestPlayerComponent implements OnInit {
  @ViewChild(AppPlayerComponent, null) player: AppPlayerComponent;
  StreamerId = "test-player-id";

  StreamerService: WebStreamerService;
  constructor() {
    //this.StreamerService = new WebStreamerService("http://localhost:5000/streamhub?channelId=9fc680b0-a6cd-11ea-87a6-02dd375f4dba");
  }

  async ngOnInit() {
    // await this.player.initialize("U03lLvhBzOw",
    //   "https://img.youtube.com/vi/KWjV25q34Hw/hqdefault.jpg")
    // //await this.player.playVideo("U03lLvhBzOw", 20);
    // try {
    //   await this.StreamerService.Connect(this.StreamerId);
    // } catch (e) {
    //   alert("Failed to connect: " + e);
    // }
    // this.StreamerService.OnPlayEvent.subscribe(data => {
    //   let now = new Date();
    //   let start = new Date(data.startDateUTC);
    //   let diff = Math.ceil((now.getTime() - start.getTime()) / 1000);

    //   if (diff > data.duration) {
    //     console.log("Media already ended, waiting next");
    //     return;
    //   }
    //   if (diff < 0) {
    //     console.log("Invalid media start date or system date");
    //   }

    //   console.log("DIFF: " + diff);
    //   this.player.playVideo(data.mediaId, diff);
    //   console.log("PlayEvent Received: " + data.mediaId);
    // })
  }

}
