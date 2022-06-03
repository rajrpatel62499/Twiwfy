import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMoreGuestComponent } from '../../modals/add-more-guest/add-more-guest.component';

@Component({
  selector: 'app-confirm-and-pay',
  templateUrl: './confirm-and-pay.component.html',
  styleUrls: ['./confirm-and-pay.component.scss']
})
export class ConfirmAndPayComponent implements OnInit {

  constructor(private dataService: DataService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addmorGuest(){
    const dialogRef = this.dialog.open(AddMoreGuestComponent).addPanelClass('add-more-guest-main');
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
