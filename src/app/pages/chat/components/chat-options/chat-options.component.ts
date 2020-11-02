import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../../../@theme/components';
import { ChatService } from '../../chat.service';

@Component({
  selector: 'chat-options',
  templateUrl: './chat-options.component.html',
  styleUrls: ['./chat-options.component.scss']
})
export class ChatOptionsComponent implements OnInit {

  constructor(private dialog: NbDialogService, private service: ChatService, private router: Router,
    private toastr: NbToastrService) { }

  @Input()
  chatId: number;
  ngOnInit() {
  }

  clickCloseChat() {
    let ref = this.dialog.open(ConfirmDialogComponent, { context: { Title: "Finalizar Atendimento", Content: "Deseja continuar?" } });
    ref.componentRef.instance.OnConfirm.subscribe(async e => {
      try {
        await this.service.CloseChat(this.chatId);
        this.toastr.success("Atendimento fechado com sucesso!", "Sucesso");
      } catch (e) {
        this.toastr.danger("Falha ao fechar atendimento", "Erro");
      }
      this.router.navigate(["/pages/chat"]);
    })
  }

}
