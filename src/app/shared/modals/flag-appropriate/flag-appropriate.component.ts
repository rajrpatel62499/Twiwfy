import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-flag-appropriate',
  templateUrl: './flag-appropriate.component.html',
  styleUrls: ['./flag-appropriate.component.scss']
})
export class FlagAppropriateComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<FlagAppropriateComponent>,) { }

  ngOnInit(): void {
  }

  onNoClick() :void{
    this.dialogRef.close();
  }
}
