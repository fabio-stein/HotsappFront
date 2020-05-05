import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PlayerService } from '../player.service';
import { timer } from 'rxjs';
declare let videojs: any;
@Component({
  selector: 'app-player',
  templateUrl: './app-player.component.html',
  styleUrls: ['./app-player.component.scss']
})
export class AppPlayerComponent implements OnInit, OnDestroy {
  constructor(private _service: PlayerService) { }

  playerObj: any;
  @ViewChild('appplayer', null) vid: ElementRef;
  isMuted = true;

  async initialize(videoId: string, thumbUrl: string) {
    return new Promise((res, rej) => {
      const options = {
        controls: false,
        //autoplay: true,
        preload: 'auto',
        muted: this.isMuted,
        poster: thumbUrl,
        sources: [{ src: 'https://www.youtube.com/watch?v=' + videoId, type: 'video/youtube' }],
        techOrder: ['youtube'],
      };
      let ctx = this;
      let updated = false;
      this.playerObj = new videojs(this.vid.nativeElement, options, function onPlayerReady() {
        res();
      });
    })
  }

  async playVideo(videoId: string, startTime?: number) {
    this.playerObj.muted(true);
    this.playerObj.src({ src: 'https://www.youtube.com/watch?v=' + videoId, type: 'video/youtube' });
    this.playerObj.play();
    if (startTime != null) {
      await this.setCurrentTime(startTime, 30000);
    }
    this.playerObj.muted(this.isMuted);
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    this.playerObj.muted(this.isMuted);
  }

  async setCurrentTime(newTime: number, timeoutMs: number) {
    let limit = timeoutMs;
    let interval = 100;
    while (limit > 0) {
      await timer(interval).take(1).toPromise();
      let time = this.playerObj.currentTime()
      if (time > 0) {
        this.playerObj.currentTime(newTime);
        break;
      }
      this.playerObj.play();
      limit -= interval;
    }
    if (limit <= 0) {
      throw new Error("Video load timeout");
    }
  }




  ngAfterViewInit() {
  }

  async ngOnInit() {
  }

  ngOnDestroy() {
    if (this.playerObj) {
      this.playerObj.dispose();
    }
  }

}
