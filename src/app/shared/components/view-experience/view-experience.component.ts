import { APIURL } from './../../../global/constants';
import { BackendResponse } from './../../models/backend-response';
import { ApiService } from './../../../services/api.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Slick } from 'ngx-slickjs';
import { ManageAccountComponent } from '../../modals/manage-account/manage-account.component';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowMoreDatesComponent } from '../../modals/show-more-dates/show-more-dates.component';
import { ShareThisExperienceComponent } from '../../modals/share-this-experience/share-this-experience.component';
import { Experience } from '../../models/experience';

@Component({
  selector: 'app-view-experience',
  templateUrl: './view-experience.component.html',
  styleUrls: ['./view-experience.component.scss']
})
export class ViewExperienceComponent implements OnInit {
  price=false

  expId: string;
  routeSub: Subscription;

  experience: Experience;
  get itemsText() {
    let text:string = '';
    if (this.experience) {
      let itemLength = this.experience?.experiencePage?.itemsToBring.length;
      for (let i = 0; i < itemLength; i++) {
        let item = this.experience.experiencePage.itemsToBring[i];
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
    }
    return text;
  }
 

  constructor(private dataService: DataService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(async (params) => {
      this.expId = params['expId'];
      console.log({ expId: this.expId, params});
      await this.fetchExpById(this.expId);
      console.log("bingo");
      
    })
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  async fetchExpById(expId: string) {
    try {
      let response: BackendResponse<Experience[]> = await this.apiService.get(`${APIURL.GET_PUBLIC_SPECIFIC_EXPERIENCE}/${expId}`, false);  
      this.experience = response.data[0];
      console.log(this.experience);
      
    } catch (error) {
      console.log(error);
    }
  }

  priceStatus(){
    this.price=!this.price
  }

  priceClose(){
    this.price = false;
  }

  arrayLength = 10;
  config23: Slick.Config = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 20000, 
    mouseWheelMove: false,
    responsive: [
      {
        breakpoint: 1660,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]  
  }

  config32: Slick.Config = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 20000, 
    mouseWheelMove: false,
    responsive: [
      {
        breakpoint: 1660,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]  
  }

  shomoreDates(){
    const dialogRef = this.dialog.open(ShowMoreDatesComponent).addPanelClass('show-more-dates-main-modal');
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  shareThis(){
    const dialogRef = this.dialog.open(ShareThisExperienceComponent).addPanelClass('share-this-experience-main');
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


