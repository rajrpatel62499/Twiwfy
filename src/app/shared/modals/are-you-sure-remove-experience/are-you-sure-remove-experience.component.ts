import { ApiService } from './../../../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIURL } from 'src/app/global/constants';

@Component({
  selector: 'app-are-you-sure-remove-experience',
  templateUrl: './are-you-sure-remove-experience.component.html',
  styleUrls: ['./are-you-sure-remove-experience.component.scss']
})
export class AreYouSureRemoveExperienceComponent implements OnInit {

  isLoading = false;
  expId: string;
  constructor(public dialogRef: MatDialogRef<AreYouSureRemoveExperienceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,  public dialog: MatDialog,
    private apiService: ApiService
    ) { }

  ngOnInit(): void {
    this.expId = this.data;
  }

  close(){
    this.dialogRef.close(false);
  }

  async deleteExperience() {
    this.isLoading = true;
    let url = APIURL.DELETE_EXPERIENCE + "/" + this.expId; 

    try {
      const response: any = await this.apiService.delete(url, true);

      if (response) {
        console.log('=======>', response);
        this.isLoading = false;
        this.dialogRef.close(true);
      }
      
    } catch (error) {
      this.isLoading = false;
      this.dialogRef.close(false);
    }

    console.log("AFter Delete", this.isLoading);
    
    
  }

}
