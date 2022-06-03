import { Experience } from 'src/app/shared/models/experience';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Slick } from 'ngx-slickjs';
import { APIURL } from 'src/app/global/constants';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-what-we-will-do',
  templateUrl: './what-we-will-do.component.html',
  styleUrls: ['./what-we-will-do.component.scss'],
  animations: [
    trigger('fade', [
      transition("void => *", [
        style({ opacity: 0}),
        animate(400, style({ opacity: 1}))
      ])
    ])
  ]
})
export class WhatWeWillDoComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: Experience;
  step: any = 1;
  locations: any;
  selectedLocation = [];

  isNextButtonClicked = false;

  @ViewChild('whatWillDo') form: NgForm;

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.getOutdoorLocations()
  }

  next(index) {
    this.isNextButtonClicked = true;

      if (this.step == 1 && index === 11) {

        if (!this.experienceData.basicInformation.isNonprofitOrg) {
          this.stepEvent.emit(10)
        } else {
          this.stepEvent.emit(11)
        }

      } else {
        this.form.valid ? this.stepEvent.emit(index) : ''; 
        
      }
  }
  async getOutdoorLocations() {
    let response: any = await this.apiService.get(APIURL.GETLOCATIONS, true)
    if (response) {
      console.log(response);
      this.locations = response.data;
      for (let i = 0; i < this.locations.length; i++) {
        for (let j = 0; j < this.locations[i].children.length; j++) {
          this.locations[i].children[j]['check'] = false
        }
      }
    }
  }
  setStep(step) {
    this.step = step;
  }
  locationChange(event, i, sl) {
    console.log(event, i, sl);
    if (this.selectedLocation.length != 0) {
      for (let x = 0; x < this.selectedLocation.length; x++) {
        if (this.selectedLocation[x].pname === this.locations[i].name) {
          this.selectedLocation[x].name = this.locations[i].children[sl].name,
            this.selectedLocation[x].pname = this.locations[i].name,
            this.selectedLocation[x].id = this.locations[i].children[sl]._id
          break;
        } else {
          if (this.selectedLocation[x].pname === this.locations[i].name) {
            this.selectedLocation[x].name = this.locations[i].children[sl].name,
              this.selectedLocation[x].pname = this.locations[i].name,
              this.selectedLocation[x].id = this.locations[i].children[sl]._id
            break
          } else {
            let modal = {
              name: this.locations[i].children[sl].name,
              pname: this.locations[i].name,
              id: this.locations[i].children[sl]._id
            }
            this.selectedLocation.push(modal);
            break
          }
        }

      }
      // this.selectedLocation = [...new Set(this.selectedLocation.map(item => item.id))];
      // var flags = [], output = [], l = this.selectedLocation.length, q;
      // for( q=0; q<l; i++) {
      // if( flags[this.selectedLocation[q].id]) continue;
      //   flags[this.selectedLocation[q].id] = true;
      //   output.push(this.selectedLocation[q].id);
      // }
      // this.selectedLocation.find((x)=> {
      //   if(x.pname === this.locations[i].name) {
      //       x.name = this.locations[i].children[sl].name,
      //       x.pname = this.locations[i].name,
      //       x.id = this.locations[i].children[sl]._id
      //   } else {
      //   if(x.pname === this.locations[i].name) {
      //       x.name = this.locations[i].children[sl].name,
      //       x.pname = this.locations[i].name,
      //       x.id = this.locations[i].children[sl]._id
      //   } else {
      //     let modal = {
      //       name:this.locations[i].children[sl].name,
      //       pname:this.locations[i].name,
      //       id:this.locations[i].children[sl]._id
      //     }  
      //     this.selectedLocation.push(modal)
      //   }
      //   }
      // })
    } else {
      let modal = {
        name: this.locations[i].children[sl].name,
        pname: this.locations[i].name,
        id: this.locations[i].children[sl]._id
      }
      this.selectedLocation.push(modal)
    }
  }
  deleteSelected(index) {
    this.selectedLocation.splice(index, 1);
  }
  ngOnDestroy() {
    if (this.selectedLocation.length != 0) {
      let modal = []
      for (let i = 0; i < this.selectedLocation.length; i++) {
        modal.push(this.selectedLocation[i]._id)
      }
      this.experienceData.experiencePage.locationsForOutdoor = modal;
    }
  }
}
