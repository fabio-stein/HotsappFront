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

  qrCodeData = "";

  processId: string = null;

  updating = false;
  looping = false;

  isSuccess: boolean = null;
  errorMessage: string = null;

  constructor(private toastrService: NbToastrService, private dialogService: NbDialogService, private connectorService: ConnectorService,
    private router: Router) {
  }

  ngOnInit() {
    this.looping = true;
    this.loopCheck();
  }

  ngOnDestroy() {
    this.looping = false;
  }

  async loopCheck() {
    try {
      let status = await this.connectorService.UpdateConnection(this.processId);
      this.qrCodeData = status.qrCodeData;
      this.processId = status.processId;
      console.log(status);

      if(status.finished == true){
        this.finish();
      }
    } catch (e) {
      console.log(e);
    }

    setTimeout(() => {
      if (this.looping) {
        this.loopCheck();
      }
    }, 1000);
  }

  reset() {
    window.location.reload();
  }

  finish() {
    this.looping = false;
    this.router.navigate(['/pages/number/my']);
  }

}
