import { Component, Input, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experience } from 'src/app/shared/models/experience';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss'],
})
export class DurationComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: Experience;

  name: any = 'Choose duration';
  experienceLableName: any = 'Choose experience time';
  formValidation: any = {};
  @ViewChild('durationForm') form: NgForm;

  experienceStartTimeData: any = [
    '12:00 AM', '12:30 AM', '01:00 AM', '01:30 AM', '02:00 AM',
    '02:30 AM', '03:00 AM', '03:30 AM', '04:00 AM', '04:30 AM',
    '05:00 AM', '05:30 AM', '06:00 AM', '06:30AM', '07:00 AM',
    '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
    '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM',
    '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
  ];

  durationTimes = this.getDurationTimes();

  getDurationTimes() {
    let times: string[] = [];
    for (let i=1; i<=16; i++) {
      times.push(`${i} hours`);
      if (i == 16) { break;}
      times.push(`${i}.5 hours`);
    }
    return times;
  }
  constructor() { }

  ngOnInit(): void {
    this.experienceLableName = this.experienceData.settings.startTime ? this.experienceData.settings.startTime : 'Choose experience time'
    this.name = this.experienceData.settings.duration ? this.experienceData.settings.duration : 'Choose duration';
  }

  next(index) {

    if (!this.experienceData.settings.duration) {
      this.formValidation.isDurationValue = true;
      return;
    } else if (!this.experienceData.settings.startTime) {
      this.formValidation.isStartTime = true;
      return;
    }

    if (index == 21) {
      this.stepEvent.emit(20);
    } else {
      this.stepEvent.emit(index);
    }
  }

  setDuration(duration) {
    console.log(duration);
    this.name = duration;
    this.experienceData.settings.duration = duration;
    this.formValidation.isDurationValue = false;
    console.log(this.experienceData);
  }

  setExperienceStartTimeData(time) {
    this.experienceLableName = time;
    this.experienceData.settings.startTime = time;
    this.formValidation.isStartTime = false;
    console.log(this.experienceData);
  }
}
