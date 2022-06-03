import { Experience } from 'src/app/shared/models/experience';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { APIURL } from 'src/app/global/constants';
import { ApiService } from 'src/app/services/api.service';
import { AreYouSureRemoveExperienceComponent } from '../../modals/are-you-sure-remove-experience/are-you-sure-remove-experience.component';

@Component({
  selector: 'app-manage-experience',
  templateUrl: './manage-experience.component.html',
  styleUrls: ['./manage-experience.component.scss'],
})
export class ManageExperienceComponent implements OnInit {
  manageExperinceArray: Experience[] = [];

  isLoading = false;

  constructor(
    public dataService: DataService,
    public apiService: ApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.dataService.fetchExperienceList();
    // this.dataService.manageExperienceList$.subscribe((res)=>{
    //   console.log("binog", res);
      
    // });
    this.getExperienceList();
  }

  Delete(expId: string) {
    const dialogRef = this.dialog
      .open(AreYouSureRemoveExperienceComponent, { data: expId })
      .addPanelClass('are-you-sure-remove');

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getExperienceList();
      }
    });

  }

  async getExperienceList() {
    this.isLoading = true;

    try {
      const response: any = await this.apiService.get(APIURL.MANAGEEXPERIENCELIST, true);
      if (response) {
        this.isLoading = false;
        console.log('=======>', response);
        this.manageExperinceArray = response.data;
      }
    } catch (error) {
      this.isLoading = false;
      console.log('=======>', error);
      
    }

    
  }
}
