import { ApiService } from 'src/app/services/api.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { APIURL } from 'src/app/global/constants';
import { BackendResponse } from 'src/app/shared/models/backend-response';
import { Experience } from 'src/app/shared/models/experience';
import { UserProfile } from 'src/app/shared/models/user-profile';

@Component({
  selector: 'app-your-preview',
  templateUrl: './your-preview.component.html',
  styleUrls: ['./your-preview.component.scss']
})
export class YourPreviewComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: Experience;

  userProfile: UserProfile;

  constructor(private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    console.log(this.experienceData);
    this.userProfile = await this.getMyProfile();
    console.log(this.userProfile);
  }


  next(index) {
    if (index === 36) {
      this.stepEvent.emit('save');
    } else if(index === 34) {
      this.stepEvent.emit(27);
    }
  }
  
  get itemsText() {
    let itemLength = this.experienceData.experiencePage.itemsToBring.length;
    let text:string = '';
    for (let i = 0; i < itemLength; i++) {
      let item = this.experienceData.experiencePage.itemsToBring[i];
      if (itemLength > 1) {
        if (i == itemLength - 1) {
          text = text.slice(0, text.length - 1);
          text += ' or ' + item;
        }else {
          text += item +', ';
        }
      } else {
        text += item; 
      }
      
    }
    return text;
  }
 

  async getMyProfile() {
    try {
      let response: BackendResponse<UserProfile> = await this.apiService.get(APIURL.GET_USER_PROFILE, true)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
