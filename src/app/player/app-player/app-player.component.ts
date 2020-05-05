import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PlayerService } from '../player.service';
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

  async initialize(videoId: string, thumbUrl: string) {
    return new Promise((res, rej) => {
      const options = {
        controls: false,
        //autoplay: true,
        preload: 'auto',
        muted: true,
        poster: thumbUrl,
        sources: [{ src: 'https://www.youtube.com/watch?v=' + videoId, type: 'video/youtube' }],
        techOrder: ['youtube'],
      };
      this.playerObj = new videojs(this.vid.nativeElement, options, function onPlayerReady() {
        res();
      });
    })
  }

  playVideo() {
    this.playerObj.src({ src: 'https://www.youtube.com/watch?v=ZeHKjBLOjOc', type: 'video/youtube' });
    this.playerObj.offset({
      start: 10,
      end: 300,
      restart_beginning: false
    })
    this.playerObj.play();

  }



  ngAfterViewInit() {
  }

  async ngOnInit() {
    //ctx.playerObj.currentTime(60)
    // await this._service.Connect(this.Channel);
    // this._service.OnUpdate.subscribe(ret => {
    //   console.log(ret);
    //   //this.vidObj.src({ src: 'https://www.youtube.com/watch?v=ZeHKjBLOjOc', type: ret.SourceType });
    //   //this.vidObj.play();
    //   console.log("CHANGE SOURCE")
    //   console.log(ret)
    //   this.vidObj.src({ src: ret.source, type: 'video/youtube' })
    //   this.vidObj.load();
    //   this.vidObj.play();
    // })
  }

  ngOnDestroy() {
    //this._service.Disconnect();
  }

}
