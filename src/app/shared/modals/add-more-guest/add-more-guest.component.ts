import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-more-guest',
  templateUrl: './add-more-guest.component.html',
  styleUrls: ['./add-more-guest.component.scss']
})
export class AddMoreGuestComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddMoreGuestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
