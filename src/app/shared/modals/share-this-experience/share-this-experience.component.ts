import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-share-this-experience',
  templateUrl: './share-this-experience.component.html',
  styleUrls: ['./share-this-experience.component.scss']
})
export class ShareThisExperienceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShareThisExperienceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
