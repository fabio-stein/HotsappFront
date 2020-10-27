import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  constructor(private service: ChatService) { }

  hideFinished = true;

  chats = []

  toggleFinished(e) {
    //TODO
  }

  async ngOnInit() {
    let res = await this.service.GetChatList();
    res.forEach(e => {
      this.chats.push({
        id: e.Id,
        createDateUtc: new Date(e.StartDateUTC),
        title: e.Id
      })
    });
  }

}
