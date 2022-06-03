import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RequestAvailablityComponent } from '../request-availablity/request-availablity.component';

@Component({
  selector: 'app-show-more-dates',
  templateUrl: './show-more-dates.component.html',
  styleUrls: ['./show-more-dates.component.scss']
})
export class ShowMoreDatesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShowMoreDatesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  requestDates(){
    const dialogRef = this.dialog.open(RequestAvailablityComponent).addPanelClass('request-available-main');
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  routeLink(){
    this.dialogRef.close();

  }

}
