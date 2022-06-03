import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlagAppropriateComponent } from '../../modals/flag-appropriate/flag-appropriate.component';

@Component({
  selector: 'app-manage-calendar',
  templateUrl: './manage-calendar.component.html',
  styleUrls: ['./manage-calendar.component.scss']
})
export class ManageCalendarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  transactions = [1,2,3,4,5,6,7,8,9,10,11,12]

  ngOnInit(): void {
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(FlagAppropriateComponent).addPanelClass('flag-appro-main');

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
