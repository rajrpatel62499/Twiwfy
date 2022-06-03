import { BackendResponse } from './../../../../../../shared/models/backend-response';
import { UploadedFile } from './../../../../../../shared/models/image-upload';
import { UtilsService } from './../../../../../../services/utils.service';
import { Experience } from 'src/app/shared/models/experience';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { APIURL, FileType, HEIGHT, MB, WIDTH } from 'src/app/global/constants';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadAnotherPhotoComponent } from 'src/app/shared/modals/upload-another-photo/upload-another-photo.component';

@Component({
  selector: 'app-your-information',
  templateUrl: './your-information.component.html',
  styleUrls: ['./your-information.component.scss'],
})
export class YourInformationComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: Experience;

  firstLoader = false;
  secondLoader = false;
  isNextClicked = false;
  isUploading = false;


  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    public util: UtilsService,
    public toastrService: ToastrService
  ) {}

  ngOnInit(): void {}
  next(index) {
    this.isNextClicked = true;

    if (index === 25 && this.experienceData.yourIdea.type === 'OFFLINE') {
      this.stepEvent.emit(34);
    } else if (index === 25 && this.experienceData.yourIdea.type === 'ONLINE') {
      this.stepEvent.emit(23);
    } else {
      const errors: string[] = this.validatePhotos();
      console.log(errors);
      
      if (errors.length > 0) {
        this.util.handleError("Please upload atlease one photo");
        return;
      }
      this.stepEvent.emit(index);
    }
  }

  validatePhotos(): string[] {
    let errors: string[] = [];
    if (this.experienceData.verificationDocument.length < 1) errors.push("first Image");
    
    return errors;
  }

  async onFileSelected(file) {

    if (this.util.isNullOrEmpty(file)) return;
    if (!this.isValidateFileTypeAndSize(file)) return;

    if (this.experienceData.verificationDocument.length >= 2) {
      this.toastrService.error('Upto two photos are allowed');
      return;
    }
    
    

    var image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = async (e: any) => {
      const image = e.path[0] as HTMLImageElement;
      console.log({width: image.width, height: image.height});

      if (image.height >= HEIGHT && image.width >= WIDTH) {
      
  
        try {
          this.isUploading = true;
          let formData: FormData = new FormData();
          formData.append('files', file);
          let response: BackendResponse<UploadedFile[]> = await this.apiService.postFormDataReqWithToken(APIURL.UPLOADPHOTO,formData);
          console.log(response);
          this.experienceData.verificationDocument.push(response.data[0]);
          this.toastrService.success('Document Uploaded Successfully');
          this.isUploading = false;
        } catch (error) {
          this.isUploading = false;
          console.log(error);
        }

      } else {
        let errorText = `Photos must be at least 800 pixels in width and 1200 pixels in height. Please upload a higher quality photo. Your photo was ${image.width}x${image.height}.`;
        const dialogRef = this.dialog
        .open(UploadAnotherPhotoComponent, { data: {errorText,fileName: file.name} })
        .addPanelClass('are-you-sure-remove');

        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
          if (result) {
            this.onFileSelected(result);
          }
        });
      }
    }

  }

  deletePic(index) {
    this.experienceData.verificationDocument.splice(index,1);
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
