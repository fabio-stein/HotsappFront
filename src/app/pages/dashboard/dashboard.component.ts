import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  messages: any[] = [];
  lastId = 0;

  constructor(private _service: MessagesService) {

  }

  ngOnInit() {
    this.LoopCheck();
  }

  sendMessage(message: string, userName: string, avatar: string, reply: boolean) {
    this._service.SendMessage(message).then(e => {
      console.log(e);
    })

    this.messages.push({
      text: message,
      date: new Date(),
      reply: reply,
      type: 'text',
      user: {
        name: userName,
        avatar: avatar,
      },
    });
  }

  async LoopCheck() {
    let message = await this._service.GetMessage(this.lastId);
    if (message != null) {
      this.lastId = message.id;
      this.messages.push({
        text: message.content,
        date: new Date(),
        reply: true,
        type: 'text',
        user: {
          name: "Tester",
          //avatar: avatar,
        },
      });
    }
    setTimeout(() => {
      this.LoopCheck();
    }, 1000);
  }
}