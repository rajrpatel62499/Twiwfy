import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { APIURL } from 'src/app/global/constants';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-upload-another-photo',
  templateUrl: './upload-another-photo.component.html',
  styleUrls: ['./upload-another-photo.component.scss']
})
export class UploadAnotherPhotoComponent implements OnInit {

  isLoading = false;
  errorText: string;
  fileName: string;

  constructor(public dialogRef: MatDialogRef<UploadAnotherPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      errorText: string,
      fileName: string
    },  public dialog: MatDialog,
    private apiService: ApiService
    ) { }

  ngOnInit(): void {
    this.errorText = this.data.errorText;
    this.fileName = this.data.fileName;  
  }

  close(){
    this.dialogRef.close(false);
  }

  onFileSelect(file) {
    this.dialogRef.close(file);
  }
}
