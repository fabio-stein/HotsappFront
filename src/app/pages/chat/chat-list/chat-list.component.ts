import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnDestroy {

  constructor(private service: ChatService) { }

  hideFinished = true;
  looping = false;

  chats = []

  toggleFinished(e) {
    //TODO
  }

  async ngOnInit() {
    this.looping = true;
    this.loopCheck();
  }

  ngOnDestroy() {
    this.looping = false;
  }

  async loopCheck() {
    try {
      let res = await this.service.GetChatList();
      this.chats = [];
      res.forEach(e => {
        this.chats.push({
          id: e.Id,
          createDateUtc: new Date(e.StartDateUTC),
          title: e.AreaTitle + " - " + e.RemoteNumber.split("@")[0]
        })
      });
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      if (this.looping) {
        this.loopCheck();
      }
    }, 3000);
  }

}
