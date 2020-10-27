import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';
import { ChatService } from '../chat.service';
import { ChatMessage } from './model/ChatMessage';
import { SendMessageRequest } from './model/SendMessageRequest';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  messages = [];
  chatId: Number;
  selectedContact: string;
  lastMessageId: Number = 0;
  subscription: Subscription;
  isUpdating = false;

  constructor(private route: ActivatedRoute, private service: ChatService) { }

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.chatId = Number.parseInt(id);

    this.subscription = timer(0, 1000).pipe(
      switchMap(() => this.getUpdate())
    ).subscribe();
    // this.UpdateMessages([
    //   {
    //     content: 'Boa tarde',
    //     dateTimeUTC: new Date(),
    //     isInternal: false
    //   },
    //   {
    //     content: 'Olá João, em que posso ajudar?',
    //     dateTimeUTC: new Date(),
    //     isInternal: true
    //   },
    //   {
    //     content: 'Gostaria de solicitar um orçamento.',
    //     dateTimeUTC: new Date(),
    //     isInternal: false
    //   },
    // ]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async getUpdate() {
    if (this.isUpdating) { return; }
    try {
      this.isUpdating = true;
      let update = await this.service.GetChatUpdate(this.chatId, this.lastMessageId);
      this.UpdateMessages(update.messages);
    } catch (e) {
      console.log(e)
    }
    this.isUpdating = false;
  }

  UpdateMessages(messages: ChatMessage[]) {
    messages.forEach(item => {
      console.log(item)
      this.lastMessageId = item.MessageId;
      let user = null;


      if (item.IsFromMe) {
        user = {
          name: 'Eu'
        }
      } else {
        user = {
          name: this.selectedContact,
          avatar: 'https://api.adorable.io/avatars/50/' + this.selectedContact
        }
      }

      let msg = {
        text: item.Body,
        date: new Date(item.DateTimeUTC),
        reply: item.IsFromMe,
        type: 'text',
        user
      };
      this.messages.push(msg);
    })
  }

  LoadChat(contactNumber: string) {
    this.messages = [];
    this.lastMessageId = 0;
    this.selectedContact = contactNumber;
  }

  OnContactSelected(e) {
    this.LoadChat(e);
  }

  async sendMessage(e) {
    let data: SendMessageRequest = {
      Body: e.message,
      ChatId: this.chatId
    }

    let msg = {
      text: e.message,
      date: new Date(),
      reply: true,
      type: 'text',
      user: { name: "Eu" }
    };

    // if (this.messages.length > 0) {//Otherwise it will be sent back by api only the first message
    //   this.messages.push(msg);
    // }

    await this.service.SendMessage(data);
  }

}
