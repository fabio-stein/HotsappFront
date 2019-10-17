import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-single-message',
  templateUrl: './new-single-message.component.html',
  styleUrls: ['./new-single-message.component.scss']
})
export class NewSingleMessageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  OnSubmit(e){
    console.log(e);
  }

}
