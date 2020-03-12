import { Component, OnInit } from '@angular/core';
import { CampaignModel } from '../model/CampaignModel';
import { CampaignService } from '../campaign.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'campaign-editor',
  templateUrl: './campaign-editor.component.html',
  styleUrls: ['./campaign-editor.component.scss']
})
export class CampaignEditorComponent implements OnInit {

  constructor(private service: CampaignService, private router: Router, private toastr: NbToastrService) { }

  ngOnInit() {
  }

  async OnSubmit(e: CampaignModel) {
    var message = this.validateCampaign(e);
    if (message != null) {
      this.toastr.warning(message, "Atenção");
      return;
    }

    try {
      let result = await this.service.Create(e);
      this.toastr.success("Campanha criada com sucesso", "Sucesso");
      this.router.navigate(['/pages/campaign/' + result]);
    } catch (e) {
      console.log(e);
      this.toastr.danger("Falha ao criar campanha", "Erro");
    }
  }

  validateCampaign(e: CampaignModel) {
    if (e.title == null || e.title.trim().length < 1) {
      return "Nome da campanha inválido";
    }
    if (e.message.trim().length < 1) {
      return "Mensagem inválida";
    }
    if (e.message.length > 65000) {
      return "Mensagem muito longa";
    }
    if (e.contactList.trim().length < 1) {
      return "Lista de contatos inválida";
    }
    var numbers = e.contactList.split("\n");
    if (numbers.length > 1 && numbers[numbers.length - 1].trim() == '') {
      numbers.pop();
    }
    for (let i = 0; i < numbers.length; i++) {
      let n = numbers[i];
      let formatted = n.replace(/\D/g, '')
      if (formatted.length > 11 || formatted.length < 10) {
        return 'Número na linha ' + (i + 1) + ' é inválido:\n' + n;
      }
    }
    return null;
  }

}
