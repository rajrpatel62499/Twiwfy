import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-private-groups',
  templateUrl: './private-groups.component.html',
  styleUrls: ['./private-groups.component.scss'],
})
export class PrivateGroupsComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: any;
  name: any = 'Choose group size';
  isGroupSize:boolean=false;
  ageArray:any = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'
  ]

  @ViewChild('privateGroup') form: NgForm;

  constructor() {}

  ngOnInit(): void {
    this.name = this.experienceData.settings.groupSize ? this.experienceData.settings.groupSize : 'Choose group size';
  }

  next(index) {

    if(this.experienceData.settings.groupSize==0){
      this.isGroupSize=true;
      return
    }

    this.stepEvent.emit(index);
  }

  allowPrivateGroup(value) {
    console.log(value.target.checked);
    this.experienceData.settings.allowPrivateGroups = value.target.checked;
    console.log(this.experienceData);
  }

  setMaxGroupSize(size) {
    console.log(size);
    this.name = size;
    this.experienceData.settings.groupSize = size;
    this.isGroupSize=false;
    console.log(this.experienceData);
  } 

  validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
      return true;
    } else if (key < 48 || key > 57) {
      return false;
    } else {
      return true;
    }
  }
}
