import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../../chat.service';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  @Input()
  currentNumber: string;
  @Output()
  OnContactSelected: EventEmitter<string> = new EventEmitter();

  isAddingContact = false;
  newContactNumber = null;
  hasUnsavedContact = false;

  constructor(private service: ChatService) { }

  async ngOnInit() {
    let e = await this.service.GetContactUpdate(this.currentNumber);
    this.contacts = [];

    let list = e.map(function (n) {
      return { numberId: n.numberId, picture: 'https://api.adorable.io/avatars/50/' + n.numberId, title: n.contactDateUTC }
    });
    this.contacts = list;
    console.log(e);
  }

  contacts = [];

  clickAddContact() {
    this.newContactNumber = null;
    this.isAddingContact = true;
    this.hasUnsavedContact = false;
  }

  selectContact(e: string) {
    this.OnContactSelected.emit(e);
    this.hasUnsavedContact = false;
  }

  cancelContactAdd() {
    this.isAddingContact = false;
    this.newContactNumber = null;
  }

  confirmContactAdd() {
    this.isAddingContact = false;
    this.OnContactSelected.emit(this.newContactNumber);
    this.hasUnsavedContact = true;
  }
}
