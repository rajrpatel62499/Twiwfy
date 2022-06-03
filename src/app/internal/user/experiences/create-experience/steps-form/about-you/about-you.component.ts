import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from './../../../../../../services/utils.service';
import { Experience } from 'src/app/shared/models/experience';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIURL, FileType, MB } from 'src/app/global/constants';
import { BackendResponse } from 'src/app/shared/models/backend-response';
import { UploadedFile } from 'src/app/shared/models/image-upload';
import { UserProfile } from 'src/app/shared/models/user-profile';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html',
  styleUrls: ['./about-you.component.scss']
})
export class AboutYouComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: Experience;

  @ViewChild('aboutYou') form: NgForm;
  isNextButtonClicked = false;

  userProfile: UserProfile;
  isProfileLoading = false;
  loader = false;

  constructor(private util: UtilsService, private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.userProfile = await this.getMyProfile();
    console.log(this.userProfile);

  }

  async getMyProfile() {
    this.isProfileLoading = true;
    try {
      let response: BackendResponse<UserProfile> = await this.apiService.get(APIURL.GET_USER_PROFILE, true)
      this.isProfileLoading = false;
      return response.data;
    } catch (error) {
      this.isProfileLoading = false;
      console.log(error);
    }
  }

  next(index) {
    this.isNextButtonClicked = true;

    if (index === 14) {
      if (this.form.invalid) return;
      if (this.experienceData.basicInformation.isNonprofitOrg) {
        this.stepEvent.emit(index);
      }
      else {
        this.stepEvent.emit(15);
      }

    } else {
      this.stepEvent.emit(index);
    }
  }
  // changeHostType(type) {
  //   this.experienceData.experiencePage.hostType = type;
  // }


  async onFileSelect(file) {
    if (this.util.isNullOrEmpty(file)) return;
    if (!this.isValidateFileTypeAndSize(file)) return;
    this.loader = true;
    let formData: FormData = new FormData();
    formData.append('files', file);

    try {
      let response: BackendResponse<UploadedFile[]> = await this.apiService.postFormDataReqWithToken(APIURL.UPLOADPHOTO, formData);
      console.log(response.data[0]);
      let image = response.data[0];

      try {
        let updated = await this.apiService.post(APIURL.UPDATE_USER_PROFILE, { profilePic: image.original }, true);
        console.log("UPDATED =====>", updated);
        this.userProfile = await this.getMyProfile();
        this.loader = false;
        this.util.showToaster("Profile pic updated successfully");
      } catch (error) {
        this.loader = false;
      }


    } catch (error) {
      this.loader = false;
    }


  }
  
  isValidateFileTypeAndSize(file) {
    if (
      file.type == FileType.JPEG ||
      file.type == FileType.PNG ||
      file.type == FileType.JPG
    ) {

    } else {
      this.util.handleError('Please upload valid file type.!!');
      return false;
    }

    if (file.size >= MB * 5) {
      this.util.handleError('File size should be less thatn 5 MB');
      return false;
    }
    return true;
    
  }


}
