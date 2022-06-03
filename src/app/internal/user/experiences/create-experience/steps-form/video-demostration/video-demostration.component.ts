import { BackendResponse } from './../../../../../../shared/models/backend-response';
import { UtilsService } from './../../../../../../services/utils.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIURL, FileType, GB } from 'src/app/global/constants';
import { ApiService } from 'src/app/services/api.service';
import { UploadedFile } from 'src/app/shared/models/image-upload';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-video-demostration',
  templateUrl: './video-demostration.component.html',
  styleUrls: ['./video-demostration.component.scss']
})
export class VideoDemostrationComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: any;

  isVideoUpload: boolean = false;
  @ViewChild('videoForm') form: NgForm;

  constructor(
    public apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private util: UtilsService
    ) { }

  ngOnInit(): void {
  }
  next(index) {
    this.stepEvent.emit(index)
  }


  async onFileSelected(file: File) {    
    console.log(file);
    if (!this.isValidateFileTypeAndSize(file)) return;
    
    let formData: FormData = new FormData();
    formData.append('file', file);
    
    this.isVideoUpload = true;
    try {
      let response: BackendResponse<UploadedFile> = await this.apiService.postFormDataReqWithToken(APIURL.UPLOADVIDEO, formData)
      console.log(response);
      this.isVideoUpload = false;
      this.setData(response.data)
      this.util.showToaster('Video is successfully uploaded');
      
    } catch (error) {
      this.isVideoUpload = false;
      this.util.handleError(error.error.message);
    }
  }

  setData(data) {    
    this.experienceData.video = data.original;
    console.log(this.experienceData);
  }

  isValidateFileTypeAndSize(file) {
    if (
      file.type == FileType.MP4 
    ) {

    } else {
      this.util.handleError('Please upload mp4 file type.!!');
      return false;
    }

    if (file.size >= 1 * GB ) {
      this.util.handleError('File size should be less than 1 GB');
      return false;
    }
    return true;
    
  }

  deleteVideo() {
    this.experienceData.video = '';
    this.cdr.detectChanges();
  }
}
