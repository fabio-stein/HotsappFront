import { Component, OnInit } from '@angular/core';
import { NumberService } from '../number.service';

@Component({
  selector: 'my-numbers',
  templateUrl: './my-numbers.component.html',
  styleUrls: ['./my-numbers.component.scss']
})
export class MyNumbersComponent implements OnInit {

  constructor(private _service: NumberService) { }

  async ngOnInit() {
    await this.UpdateList();
  }

  async UpdateList(){
    this.numbers = await this._service.GetMyNumbers();
  }

  numbers:any[];

  async DeleteNumber(numberId){
    await this._service.DeleteNumber(numberId);
    await this.UpdateList();
  }

}
