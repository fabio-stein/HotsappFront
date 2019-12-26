import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ChatService } from './chat.service';
import { ChatMessage } from './model/ChatMessage';
import { Subscription, timer } from 'rxjs';
import { SendMessageRequest } from './model/SendMessageRequest';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  messages = [];
  currentNumber: string
  selectedContact: string;
  lastUpdate: Date;
  subscription: Subscription;
  isUpdating = false;

  constructor(private route: ActivatedRoute, private service: ChatService) { }

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.currentNumber = id;

    this.subscription = timer(0, 1000).pipe(
      switchMap(() => this.getUpdate())
    ).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async getUpdate() {
    if (this.isUpdating) { return; }
    try {
      this.isUpdating = true;
      let update = await this.service.GetChatUpdate(this.currentNumber, this.selectedContact, this.lastUpdate);
      this.lastUpdate = update.lastUpdate;
      this.UpdateMessages(update.messages);
    } catch (e) {
      console.log(e)
    }
    this.isUpdating = false;
  }

  UpdateMessages(messages: ChatMessage[]) {
    messages.forEach(item => {

      let user = null;


      if (item.isInternal) {
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
        text: item.content,
        date: new Date(item.dateTimeUTC),
        reply: item.isInternal,
        type: 'text',
        user
      };
      this.messages.push(msg);
    })
  }

  LoadChat(contactNumber: string) {
    this.messages = [];
    this.lastUpdate = null;
    this.selectedContact = contactNumber;
  }

  OnContactSelected(e) {
    this.LoadChat(e);
  }

  async sendMessage(e) {
    let data: SendMessageRequest = {
      ContactNumber: this.selectedContact,
      Content: e.message,
      NumberId: this.currentNumber
    }

    let msg = {
      text: e.message,
      date: new Date(),
      reply: true,
      type: 'text',
      user: { name: "Eu" }
    };

    if (this.messages.length > 0) {//Otherwise it will be sent back by api only the first message
      this.messages.push(msg);
    }

    await this.service.SendMessage(data);
  }

}
