import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChannelService } from '../channel.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { WalletService } from '../../wallet/wallet.service';

@Component({
  selector: 'channel-dashboard',
  templateUrl: './channel-dashboard.component.html',
  styleUrls: ['./channel-dashboard.component.scss']
})
export class ChannelDashboardComponent implements OnInit, OnDestroy {

  id;

  constructor(private route: ActivatedRoute, private channelService: ChannelService, private router: Router, private dialog: NbDialogService,
    private walletService: WalletService, private toastr: NbToastrService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnDestroy() {
  }

  goBack() {
    this.router.navigate(['/pages/campaign/']);
  }

}