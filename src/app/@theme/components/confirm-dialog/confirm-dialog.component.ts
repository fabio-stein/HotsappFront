import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  Title:string;
  Content:string;

  OnConfirm$: Subject<any> = new Subject();
  public OnConfirm: Observable<any> = this.OnConfirm$.asObservable();

  OnCancel$: Subject<any> = new Subject();
  public OnCancel: Observable<any> = this.OnCancel$.asObservable();
  constructor(protected dialogRef: NbDialogRef<ConfirmDialogComponent>) { }

  ngOnInit() {
  }

  confirmClick() {
    this.dialogRef.close();
    this.OnConfirm$.next();
    this.OnConfirm$.complete();
  }

  cancelClick() {
    this.dialogRef.close();
    this.OnCancel$.next();
    this.OnCancel$.complete();
  }
}
