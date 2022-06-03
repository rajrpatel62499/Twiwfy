import { SignupType } from './../../../../global/enums';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { APIURL, FileType, MB } from 'src/app/global/constants';
import { ApiService } from 'src/app/services/api.service';
import { FormService } from 'src/app/services/form.service';
import { UtilsService } from 'src/app/services/utils.service';
import { BackendResponse } from 'src/app/shared/models/backend-response';
import { UserProfile } from 'src/app/shared/models/user-profile';
import { UploadedFile } from 'src/app/shared/models/image-upload';
import * as moment from 'moment';
import { RegexEnum } from 'src/app/global/regexEnum';
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  userProfile: UserProfile;
  isEditMode = false;
  isLoading = false;
  isUploading = false;
  isSaving = false;

  tempFormValue: UserProfile;

  form: FormGroup;
  SignupType = SignupType;

  get f() : {  
    [key: string]: AbstractControl;
  }{ return this.form.controls; }

  constructor(private apiService: ApiService,
    private util: UtilsService,
    private formService: FormService,
    private fb: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.init();
    
  }

  async init() {
    try {
      this.isLoading = true;

      this.form = this.getBlankForm();
      this.userProfile = await this.getMyProfile();

      if (this.userProfile.dob) {
        this.userProfile.dob = moment(this.userProfile.dob).format("MM/DD/YYYYY") ; 
      }


      this.form.patchValue(this.userProfile);

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
      
    }
    console.log(this.userProfile);
  }



  async getMyProfile() {
    try {
      let response: BackendResponse<UserProfile> = await this.apiService.get(APIURL.GET_USER_PROFILE, true)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProfile(profile) {
    // let updated = await this.apiService.post(APIURL.UPDATE_USER_PROFILE, { profilePic: image.original }, true);
  }

  editMode() {
    this.isEditMode = true;
    this.formService.markFormGroupUnTouched(this.form);
    this.tempFormValue = this.form.value;
  }

  cancel() {
    this.form.patchValue(this.tempFormValue);
    this.tempFormValue =  null;
    this.isEditMode = false;
  }

  async save() {
    console.log(this.form);
    if (this.form.invalid) {
      let arr = this.formService.findInvalidControlsRecursive(this.form);
      console.log(arr);
      this.util.handleError("Please check all fields");
      return;
    }
    const payload = this.prepareForPayload(this.form.value);
    console.log(payload);
    try {
      this.isSaving = true;
      let updated = await this.apiService.post(APIURL.UPDATE_USER_PROFILE, payload, true);
      console.log("UPDATED =====>", updated);
      this.userProfile = await this.getMyProfile();
      this.isSaving = false;
      this.util.showToaster("Profile updated successfully");
    } catch (error) {
      this.isSaving = false;
    }
    
    this.isEditMode = false;
  }
  
  async onFileSelect(file) {
    if (this.util.isNullOrEmpty(file)) return;
    if (!this.isValidateFileTypeAndSize(file)) return;
    this.isUploading = true;
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
        this.isUploading = false;
        this.util.showToaster("Profile pic updated successfully");
      } catch (error) {
        this.isUploading = false;
      }


    } catch (error) {
      this.isUploading = false;
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

  private getBlankForm(): FormGroup {
    let form = this.fb.group({
      profilePic: [''],
      dob: [''],
      mobile: [''],
      countryCode: [''],
      email: ['', Validators.pattern(RegexEnum.email)],
      fullName: [''],
      signupType: [''],

      gender: ['',[Validators.pattern(RegexEnum.onlyAlphabets)]],
      address: [''],
      city: ['',[Validators.pattern(RegexEnum.onlyAlphabets)]],
      state: ['',[Validators.pattern(RegexEnum.onlyAlphabets)]],
      zip: [''],
      emergencyContact: ['']
    })
    return form;
  }

  private prepareForPayload(profile: UserProfile) {
    delete profile.fullName;
    delete profile.dob;
    delete profile.signupType;
    delete profile.profilePic;

    if (profile.signupType == SignupType.MOBILE) {
      delete profile.mobile;
      delete profile.countryCode;
    } 
    if (profile.signupType == SignupType.EMAIL) {
      delete profile.email;
    } 
    return profile;
  }
}
