import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-request-availablity',
  templateUrl: './request-availablity.component.html',
  styleUrls: ['./request-availablity.component.scss']
})
export class RequestAvailablityComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RequestAvailablityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
