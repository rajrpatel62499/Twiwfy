import { Experience } from 'src/app/shared/models/experience';
import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-booking-settings',
  templateUrl: './booking-settings.component.html',
  styleUrls: ['./booking-settings.component.scss'],
})
export class BookingSettingsComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: Experience;
  
  @ViewChild('bookingForm') form: NgForm;

  isCutOfTime: boolean = false;

  cutOffTimesForOthers: { value: string}[] = this.getCuttofTimes();
  cutOffTimesForFirst: { value: string}[] = this.getCuttofTimes();

  getCuttofTimes(): { value: string}[] {
    let times: { value: string}[] = [];
    [0,1,2,3,4,6,8,12,18].forEach(x => times.push({ value: `${x} ${x == 1? 'hour': 'hours'} before start time`}));
    [1,2,3,4,5,6].forEach(x => times.push({ value: `${x} ${x == 1? 'day': 'days'} before start time`}));
    [1].forEach(x => times.push({ value: `${x} week before start time`}))
    return times;
  }
  constructor() {}

  ngOnInit(): void {
    this.setData();
  }
  
  setData() {
    if (!this.experienceData.settings.cuttOffTimeForFirst) {
      this.experienceData.settings.cuttOffTimeForFirst = this.cutOffTimesForOthers[0].value;
    } else {
      let index = this.cutOffTimesForOthers.findIndex(x => x.value == this.experienceData.settings.cuttOffTimeForOthers);
      if (index) {
        this.cutOffTimesForFirst = this.cutOffTimesForOthers.slice(index, this.cutOffTimesForOthers.length);
      }
    }
    if (!this.experienceData.settings.cuttOffTimeForOthers) {
      this.experienceData.settings.cuttOffTimeForOthers = this.cutOffTimesForOthers[0].value;
    }
    
  }

  next(index) {
    if (!this.experienceData.settings.cuttOffTimeForOthers) {
      this.isCutOfTime = true;
      return;
    }

    if (index === 26 && this.experienceData.yourIdea.type === 'OFFLINE')
    this.stepEvent.emit(28);
    else if (index === 26 && this.experienceData.yourIdea.type === 'ONLINE')
    this.stepEvent.emit(27);
    else 
    this.stepEvent.emit(index);
  }

  setCutOffTimeForOthers(ctf: {value: string}, index) {
    this.experienceData.settings.cuttOffTimeForOthers = ctf.value;
    this.experienceData.settings.cuttOffTimeForFirst = ctf.value;
    this.cutOffTimesForFirst = this.cutOffTimesForOthers.slice(index, this.cutOffTimesForOthers.length);
  }
  onCutOfTImAllow(value: MatCheckboxChange) {
    this.experienceData.settings.availability = value.checked; 
  }
}
