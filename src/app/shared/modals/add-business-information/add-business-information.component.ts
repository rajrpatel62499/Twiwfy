import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-business-information',
  templateUrl: './add-business-information.component.html',
  styleUrls: ['./add-business-information.component.scss']
})
export class AddBusinessInformationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddBusinessInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  Close(){
    this.dialogRef.close();

  }

}
