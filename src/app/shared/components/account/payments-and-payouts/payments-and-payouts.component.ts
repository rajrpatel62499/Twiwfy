import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LinkABankAccountComponent } from '../../../modals/link-a-bank-account/link-a-bank-account.component';
import { LinkDebitAndCreditCardComponent } from '../../../modals/link-debit-and-credit-card/link-debit-and-credit-card.component';
import { AddBusinessInformationComponent } from '../../../modals/add-business-information/add-business-information.component';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-payments-and-payouts',
  templateUrl: './payments-and-payouts.component.html',
  styleUrls: ['./payments-and-payouts.component.scss']
})
export class PaymentsAndPayoutsComponent implements OnInit {

  constructor(private dataService: DataService,
    public dialog: MatDialog) { }
    
  transactions = [1,2,3,4,5,6,7,8,9,10,11,12]

  ngOnInit(): void {
  }

  linkBankaccount(){
    const dialogRef = this.dialog.open(LinkABankAccountComponent).addPanelClass('link-a-bank-account');
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  linkCard(){
    const dialogRef = this.dialog.open(LinkDebitAndCreditCardComponent).addPanelClass('link-a-bank-account');
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addVat(){
    const dialogRef = this.dialog.open(AddBusinessInformationComponent).addPanelClass('link-a-bank-account');
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
