import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CampaignService } from '../campaign.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../../@theme/components';
import { WalletService } from '../../wallet/wallet.service';

@Component({
  selector: 'campaign-status',
  templateUrl: './campaign-status.component.html',
  styleUrls: ['./campaign-status.component.scss']
})
export class CampaignStatusComponent implements OnInit, OnDestroy {

  id;
  updater: Subscription;
  status;

  constructor(private route: ActivatedRoute, private campaignService: CampaignService, private router: Router, private dialog: NbDialogService,
    private walletService: WalletService, private toastr: NbToastrService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.updater = timer(0, 5000).pipe(
      switchMap(() => this.update())
    ).subscribe();
  }

  ngOnDestroy() {
    this.updater.unsubscribe();
  }

  async update() {
    this.status = await this.campaignService.GetStatus(this.id);
  }

  statusResolver(status) {
    switch (status) {
      case "running":
        return "Enviando...";
      case "paused":
        return "Pausado";
      case "finished":
        return "Finalizado";
      case "canceled":
        return "Cancelado"
    }
    return "Desconhecido";
  }

  async pause() {
    await this.campaignService.Stop(this.id);
    await this.update();
  }

  async start() {
    this.toastr.primary("Carregando", "Aguarde");
    let credits = await this.walletService.GetCurrentBalance();
    let pricePerUnit = 0.15;
    let totalPrice = this.status.total * pricePerUnit;
    if (credits >= totalPrice) {
      let ref = this.dialog.open(ConfirmDialogComponent, { context: { Title: "Iniciar Campanha", Content: "Atenção!\n\nVocê possui:\n" + credits + " crédito(s)\nEssa campanha deve utilizar:\n" + totalPrice + " crédito(s).\n\nO valor das mensagens não enviadas será devolvido automaticamente\npara sua carteira quando a campanha for encerrada.\n\nDeseja Continuar?" } });
      ref.componentRef.instance.OnConfirm.subscribe(async e => {
        await this.campaignService.Start(this.id);
        await this.update();
      })
    } else {
      let ref = this.dialog.open(ConfirmDialogComponent, { context: { Title: "Iniciar Campanha", Content: "Você precisa de mais créditos para iniciar esta campanha!\n\nCrédito(s) na carteira:\n" + credits + "\nEssa campanha deve utilizar:\n" + totalPrice + " crédito(s).\n\nComprar Créditos?" } });
      ref.componentRef.instance.OnConfirm.subscribe(async e => {
        this.router.navigate(["/pages/wallet"])
      })
    }
  }

  async cancel() {
    await this.campaignService.Cancel(this.id);
    await this.update();
  }

  goBack() {
    this.router.navigate(['/pages/campaign/']);
  }

}
