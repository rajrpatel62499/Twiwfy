import { BackendResponse } from './../../../../../../shared/models/backend-response';
import { Experience } from 'src/app/shared/models/experience';
import { UtilsService } from './../../../../../../services/utils.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIURL, FileType, HEIGHT, MB, WIDTH } from 'src/app/global/constants';
import { ApiService } from 'src/app/services/api.service';
import { UploadedFile } from 'src/app/shared/models/image-upload';
import { MatDialog } from '@angular/material/dialog';
import { UploadAnotherPhotoComponent } from 'src/app/shared/modals/upload-another-photo/upload-another-photo.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: Experience;

  imageSrc: any = '';
  isNextClicked = false;

  imageSoucrce: any = {};
  loadingSkeleton: any = {};


  @ViewChild('photosForm') form: NgForm;

    
    constructor(public apiService: ApiService, 
      public util: UtilsService,
      public dialog: MatDialog,
      private cdr: ChangeDetectorRef
      ) { }

  ngOnInit(): void {
    console.log("====>", this.experienceData.experiencePage.actionPhoto)
  }
  
  next(index) {
    this.isNextClicked = true;
    if (index === 18) {

      const errors: string[] = this.validatePhotos();
      console.log(errors);

      if (errors.length > 0) {
        this.util.handleError("Please upload required photos");
        return;
      }
    }
    this.stepEvent.emit(index);
  }

  validatePhotos(): string[] {
    let errors: string[] = [];
    let keyTypeArray = [
      'coverPhoto',
      'hostPhoto',
      'actionPhoto',
      'detailsPhoto',
      'locationPhoto',
    ];
    keyTypeArray.forEach((type, index, all) => {
      if (this.util.isNullOrEmpty(this.experienceData.experiencePage[type])) { errors.push(type); }
    });
    if (this.experienceData.photos.length === 0) { errors.push('photos') }
    return errors;
  }

  setData(type, data) {
    console.log(type, data);
    let keyTypeArray = [
      'coverPhoto',
      'hostPhoto',
      'actionPhoto',
      'detailsPhoto',
      'locationPhoto',
      'miscellaneousPhoto',
    ];

    for (let index = 0; index < keyTypeArray.length; index++) {
      if (keyTypeArray[index] === type) {
        console.log('String Match', keyTypeArray[index]);
        this.experienceData.experiencePage[type] = data.original;
        this.imageSoucrce[type] = data.original;
      }
    }

    console.log(this.experienceData);
  }

  async onFileSelect(file, type) {
    console.log(file);
    
    if (this.util.isNullOrEmpty(file)) return;
    if (!this.isValidateFileTypeAndSize(file)) return;

    this.loadingSkeleton[type] = true;
    let formData: FormData = new FormData();
    formData.append('files', file);

    var image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = async (e: any) => {
      const image = e.path[0] as HTMLImageElement;
      console.log({width: image.width, height: image.height});
      if (image.height >= HEIGHT && image.width >= WIDTH) {
        try {
          let response: BackendResponse<UploadedFile[]> = await this.apiService.postFormDataReqWithToken(APIURL.UPLOADPHOTO, formData);
          console.log(response);
          if (response && response.message === 'Success') {
            this.setData(type, response.data[0]);
            this.loadingSkeleton[type] = false;
          }
        } catch (error) {
          this.loadingSkeleton[type] = false;
        }
      } else {
        this.loadingSkeleton[type] = false;
        let errorText = `Photos must be at least 800 pixels in width and 1200 pixels in height. Please upload a higher quality photo. Your photo was ${image.width}x${image.height}.`;
        const dialogRef = this.dialog
        .open(UploadAnotherPhotoComponent, { data: {errorText,fileName: file.name} })
        .addPanelClass('are-you-sure-remove');

        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
          if (result) {
            this.onFileSelect(result,type)
          }
        });
      }
    }
    


  }
  async onMultiFileUpload(file: File, type) {
    if (this.util.isNullOrEmpty(file)) return;
    if (!this.isValidateFileTypeAndSize(file)) return;
    if (this.experienceData.photos.length >= 11) {
      this.util.handleError("Upto 15 photos allowed!");
      return;
    }
   var image = new Image();
   image.src = URL.createObjectURL(file);
   image.onload = async (e: any) => {
      const image = e.path[0] as HTMLImageElement;
      console.log({width: image.width, height: image.height});
      if (image.height >= HEIGHT && image.width >= WIDTH) {
        this.loadingSkeleton[type] = true;

        let formData: FormData = new FormData();
        formData.append('files', file);
        let response: BackendResponse<UploadedFile[]> = await this.apiService.postFormDataReqWithToken(APIURL.UPLOADPHOTO, formData);
        console.log(response);

        if (response && response.message === 'Success') {
          this.experienceData.photos.push(response.data[0]);
        }
        console.log(this.experienceData);
        this.loadingSkeleton[type] = false;

      } else {
        let errorText = `Photos must be at least 800 pixels in width and 1200 pixels in height. Please upload a higher quality photo. Your photo was ${image.width}x${image.height}.`;
        const dialogRef = this.dialog
        .open(UploadAnotherPhotoComponent, { data: {errorText,fileName: file.name} })
        .addPanelClass('are-you-sure-remove');

        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
          if (result) {
            this.onMultiFileUpload(result,type)
          }
        });
      }
    }

    
  }


  async onPhotosArrayUpload(file, index) {
    if (this.util.isNullOrEmpty(file)) return;
    if (!this.isValidateFileTypeAndSize(file)) return;

    let formData: FormData = new FormData();
    formData.append('files', file);

    var image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = async (e: any) => {
      const image = e.path[0] as HTMLImageElement;
      console.log({width: image.width, height: image.height});

      if (image.height >= HEIGHT && image.width >= WIDTH) {
        try {
          let response: BackendResponse<UploadedFile[]> = await this.apiService.postFormDataReqWithToken(APIURL.UPLOADPHOTO, formData);
          console.log(response);
          if (response && response.message === 'Success') {
            this.experienceData.photos[index] = response.data[0];
          }
        } catch (error) {
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
            this.onPhotosArrayUpload(result,index)
          }
        });
      }
    }
    

  }


  deletePhotos(type) {
    this.experienceData.experiencePage[type] = '';
    this.cdr.detectChanges();
  }
  
  deletePhotosFromArray(index) {
    this.experienceData.photos.splice(index,1);
    this.cdr.detectChanges();
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

  isValidResolution(file, width, height) {
    var image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = (e: any) => {
      const image = e.path[0] as HTMLImageElement;
      if (image.height >= height && image.width >= width) {
        return true;
      } else {
        return false;
      }
    }

  }

    // readUrl(file: FileList) {
  //   if (file && file[0]) {
  //     const files = file[0];
  //     const reader = new FileReader();
  //     reader.onload = e => this.imageSoucrce.coverPhoto = reader.result;
  //     reader.readAsDataURL(files);
  //   }
  // }
}
