import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PlayerService } from '../player.service';
import { AppPlayerComponent } from '../app-player/app-player.component';

@Component({
  selector: 'external-player',
  templateUrl: './external-player.component.html',
  styleUrls: ['./external-player.component.scss']
})

export class ExternalPlayerComponent implements OnInit {
  @ViewChild(AppPlayerComponent, null) player: AppPlayerComponent;

  constructor(private _service: PlayerService) { }

  ngAfterViewInit() {

  }

  async ngOnInit() {
    await this.player.initialize("U03lLvhBzOw",
      "https://img.youtube.com/vi/KWjV25q34Hw/hqdefault.jpg")
    await this.player.playVideo("U03lLvhBzOw", 20);
  }

  ngOnDestroy() {
  }

}
