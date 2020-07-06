import { Component, OnInit, Input } from '@angular/core';
import { ThumbItemModel } from './ThumbItemModel';

@Component({
  selector: 'thumb-item',
  templateUrl: './thumb-item.component.html',
  styleUrls: ['./thumb-item.component.scss']
})
export class ThumbItemComponent implements OnInit {
  @Input()
  data: ThumbItemModel;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

}
