import { Component, OnInit } from '@angular/core';
import { NumberService } from '../number.service';
import { Router } from '@angular/router';

@Component({
  selector: 'buy-number',
  templateUrl: './buy-number.component.html',
  styleUrls: ['./buy-number.component.scss']
})
export class BuyNumberComponent implements OnInit {

  constructor(private service:NumberService, private router:Router) { }

  ngOnInit() {
  }

  async BuyNew(){
    await this.service.ReserveNew();
    this.router.navigate(["/pages/number/my"])
  }

}
