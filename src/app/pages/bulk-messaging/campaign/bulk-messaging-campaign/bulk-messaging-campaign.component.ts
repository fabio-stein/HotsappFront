import { Component, OnInit } from '@angular/core';
import { CampaignModel } from '../model/CampaignModel';

@Component({
  selector: 'bulk-messaging-campaign',
  templateUrl: './bulk-messaging-campaign.component.html',
  styleUrls: ['./bulk-messaging-campaign.component.scss']
})
export class BulkMessagingCampaignComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  OnSubmit(e: CampaignModel) {
    var message = this.validateCampaign(e);
    if (message != null) {
      alert(message);
      return;
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
