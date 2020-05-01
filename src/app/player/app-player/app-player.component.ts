import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PlayerService } from '../player.service';
declare let videojs: any;
@Component({
  selector: 'app-player',
  templateUrl: './app-player.component.html',
  styleUrls: ['./app-player.component.scss']
})
export class AppPlayerComponent implements OnInit, OnDestroy {

  @Input()
  Channel: string = "1";

  constructor(private _service: PlayerService) { }

  vidObj: any;
  @ViewChild('myvid', null) vid: ElementRef;

  ngAfterViewInit() {
    const options = {
      controls: false,
      autoplay: true,
      preload: 'auto',
      muted: true,
      poster: 'https://images.pexels.com/photos/34407/pexels-photo.jpg?cs=srgb&dl=app-apple-hand-34407.jpg&fm=jpg',
      sources: [{ src: 'https://www.youtube.com/watch?v=ZeHKjBLOjOc', type: 'video/youtube' }],
      techOrder: ['youtube'],
      
    };

    let ctx = this;
    this.vidObj = new videojs(this.vid.nativeElement, options, function onPlayerReady() {
      videojs.log('Your player is ready!');
    });


  }

  async ngOnInit() {

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
