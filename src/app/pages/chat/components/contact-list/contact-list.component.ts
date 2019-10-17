import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  users = [
    { name: 'Carla Espinosa', title: 'Nurse', picture: 'https://api.adorable.io/avatars/50/001.png' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine', picture: 'https://api.adorable.io/avatars/50/002.png' },
    { name: 'Janitor', title: 'Janitor', picture: 'https://api.adorable.io/avatars/50/003.png' },
    { name: 'Perry Cox', title: 'Doctor of Medicine', picture: 'https://api.adorable.io/avatars/50/004.png' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer', picture: 'https://api.adorable.io/avatars/50/005.png' },
  ];
}
