import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.scss']
})
export class LanguageModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LanguageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  // ---------close-modal--------//
  onNoClick(): void {
    this.dialogRef.close();
  }

}
