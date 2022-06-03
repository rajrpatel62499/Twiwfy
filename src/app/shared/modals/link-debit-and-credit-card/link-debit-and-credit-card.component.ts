import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-link-debit-and-credit-card',
  templateUrl: './link-debit-and-credit-card.component.html',
  styleUrls: ['./link-debit-and-credit-card.component.scss']
})
export class LinkDebitAndCreditCardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LinkDebitAndCreditCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  Close(){
    this.dialogRef.close();

  }
}
