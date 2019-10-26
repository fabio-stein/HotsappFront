import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  messages: any[] = [];
  lastId = 0;

  constructor() {

  }

  ngOnInit() {
  }
}