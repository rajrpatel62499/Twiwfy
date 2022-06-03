import { Experience } from 'src/app/shared/models/experience';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIURL } from 'src/app/global/constants';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-audience',
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.scss'],
})
export class AudienceComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Output() isNonProfitTypeChanged: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: Experience;
  audiences: any;

  selectedAudienceType = 'Everyone';
  isAudianceType: boolean = false;
  audianceTypeSelected: any = [];

  isLoading = false;

  @ViewChild('audience') form: NgForm;


  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    console.log("=======>",this.experienceData.basicInformation.audienceType);
    this.getAllAudienceType();
  }
  next(index) {       
       
    if(this.selectedAudienceType=="Specific"){
      if(this.audianceTypeSelected.length > 3 || this.audianceTypeSelected.length == 0){
        this.isAudianceType=true;
        return;
      }
    }

    if(this.experienceData.basicInformation.isNonprofitOrg) {
      this.stepEvent.emit(index);
    } else {
      if(index === 11) 
      this.stepEvent.emit(12);
      else if (index == 9)
      this.stepEvent.emit(9); 
      
    }
  }
  changeType(type) {        
    this.experienceData.basicInformation.audienceType = type;
    this.selectedAudienceType = type;
    if (type === 'Everyone') {
      for (let i = 0; i < this.audiences.length; i++) {
        this.audiences[i]['check'] = false;
      }
    }
  }
  async getAllAudienceType() {
    this.isLoading = true;
    try {
      let response: any = await this.apiService.get(APIURL.GETAUDIENCE, true);
      if (response) {
        console.log(response);
        this.audiences = response.data;
        for (let i = 0; i < this.audiences.length; i++) {
          if(this.experienceData.basicInformation.audience.includes(this.audiences[i]._id)){
            this.audiences[i]['check'] = true;
          } else{
            this.audiences[i]['check'] = false;
          }
        }
      }
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
      
    }
  }

  audienceTypeChange(event,value) {
    if(event.checked==true){
      this.audianceTypeSelected.push(value);
    } else{
      for (let index = 0; index < this.audianceTypeSelected.length; index++) {
        if(this.audianceTypeSelected[index]._id==value._id){
          this.audianceTypeSelected.splice(index,1);
          break;
        }
      }
    }

    console.log(this.audianceTypeSelected)
  }

  ngOnDestroy() {
    for (let i = 0; i < this.audiences?.length; i++) {
      if (this.audiences[i].check)
        this.experienceData.basicInformation.audience.push(
          this.audiences[i]._id
        );
    }
  }
}
