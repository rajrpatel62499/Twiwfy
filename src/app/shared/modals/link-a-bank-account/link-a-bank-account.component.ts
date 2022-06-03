import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-link-a-bank-account',
  templateUrl: './link-a-bank-account.component.html',
  styleUrls: ['./link-a-bank-account.component.scss']
})
export class LinkABankAccountComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LinkABankAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  Close(){
    this.dialogRef.close();

  }

}
