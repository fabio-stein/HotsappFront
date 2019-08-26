import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from '../../channel.service';

@Component({
  selector: 'channel-control-view',
  templateUrl: './channel-control-view.component.html',
  styleUrls: ['./channel-control-view.component.scss']
})
export class ChannelControlViewComponent implements OnInit {

  @Input()
  Channel: number;

  type = "success";
  on = false;
  timer;
  actionPending = false;

  constructor(private service: ChannelService) { }

  ngOnInit() {
    this.update();
  }

  ngOnDestroy() {
    if (this.timer != null) {
      clearTimeout(this.timer);
    }
  }

  switch() {
    this.actionPending = true;
    if (this.on) {
      this.service.StopChannel(this.Channel).then(r => {
      })
    } else {
      this.service.StartChannel(this.Channel).then(r => {
      });
    }
  }

  update() {
    this.service.ChannelStatus(this.Channel).then(r => {
      if (this.actionPending && r.running != this.on) {
        this.actionPending = false;
      }
      this.on = r.running;
      console.log(r)
      this.timer = setTimeout(() => {
        this.update();
      }, 3000);
    })
  }

}
