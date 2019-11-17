import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbStepperComponent, NbToastrService, NbDialogService } from '@nebular/theme';
import { isNumber } from 'util';
import { ConnectorService } from './connector.service';
import { Router } from '@angular/router';

@Component({
  selector: 'number-connector',
  templateUrl: './number-connector.component.html',
  styleUrls: ['./number-connector.component.scss']
})
export class NumberConnectorComponent implements OnInit, OnDestroy {
  @ViewChild(NbStepperComponent, null)
  stepper: NbStepperComponent;

  countryCode: string = "55";
  areaCode: string = "";
  phoneNumber: string = "";
  confirmCode: string = "";

  currentFlowId: string = null;

  updating = false;
  looping = false;

  isSuccess: boolean = null;
  errorMessage: string = null;

  constructor(private toastrService: NbToastrService, private dialogService: NbDialogService, private connectorService: ConnectorService,
    private router: Router) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.looping = false;
  }

  sendFirst() {
    this.stepper.next();
  }

  async startFlow() {
    if (!this.validatePhone())
      return;
    this.updating = true;
    this.toastrService.info("Carregando...", "Aguarde");

    try {
      let res = await this.connectorService.StartFlow(this.countryCode, this.areaCode, this.phoneNumber);
      this.currentFlowId = res;
      this.toastrService.success("Código enviado com sucesso!", "Sucesso");
      this.stepper.next();
    } catch (e) {
      this.toastrService.danger("Houve um erro", "Erro");
    } finally {
      this.updating = false;
    }
  }

  async sendConfirmCode() {
    if (!this.isValidNumber(this.confirmCode)) {
      this.toastrService.danger("Código inválido", "Erro");
      return;
    }
    this.updating = true;
    this.toastrService.info("Carregando...", "Aguarde");

    try {
      let res = await this.connectorService.ConfirmCode(this.currentFlowId, this.confirmCode);
      this.toastrService.info("Validando código...", "Aguarde");
      this.stepper.next();

      this.looping = true;
      this.loopCheck();
    } catch (e) {
      this.toastrService.danger("Houve um erro", "Erro");
    } finally {
      this.updating = false;
    }
  }

  async loopCheck() {
    try {
      let status = await this.connectorService.CheckFlowStatus(this.currentFlowId);
      if (status.isActive != null && status.isActive == false) {
        this.looping = false;
        this.stepper.next();
        this.isSuccess = status.isSuccess;
        this.errorMessage = status.errorMessage;
      }
      console.log(status);
    } catch (e) {
      console.log(e);
    }

    setTimeout(() => {
      if (this.looping) {
        this.loopCheck();
      }
    }, 1000);
  }

  validatePhone(): boolean {
    if (!this.isValidNumber(this.countryCode)) {
      this.toastrService.danger("Código do país inválido", "Erro");
      return false;
    }

    if (!this.isValidNumber(this.areaCode)) {
      this.toastrService.danger("Código de área inválido", "Erro");
      return false;
    }

    if (!this.isValidNumber(this.phoneNumber)) {
      this.toastrService.danger("Número de telefone inválido", "Erro");
      return false;
    }
    return true;
  }

  isValidNumber(n) {
    if (n == null || n == "" || n == undefined) {
      return false;
    }

    if (isNaN(n)) {
      return false;
    }
    if (Number.parseInt(n) <= 0) {
      return false;
    }
    return true;
  }

  reset() {
    window.location.reload();
  }

  finish() {
    this.router.navigate(['/pages/number/my']);
  }

}
