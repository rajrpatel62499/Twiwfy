import { Experience } from 'src/app/shared/models/experience';
import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-group-size',
  templateUrl: './group-size.component.html',
  styleUrls: ['./group-size.component.scss'],
})
export class GroupSizeComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: Experience;
  name: any = 'Choose Number of guests';
  isGroupSizeValid: boolean = false;
  maxArray:any = [
    '1',
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
  constructor() {}

  ngOnInit(): void {
    this.name = this.experienceData.settings.maxGroupSize ? this.experienceData.settings.maxGroupSize : 'Choose Number of guests';
  }

  setMaxGroupSize(size) {
    console.log(size);
    this.name = size;
    this.experienceData.settings.maxGroupSize = size;
    this.isGroupSizeValid = false;
    console.log(this.experienceData);
  }

  next(index) {   

    if (this.experienceData.settings.maxGroupSize==0) {
      this.isGroupSizeValid = true;
      return;
    }
    if (index == 21 ) {
      this.stepEvent.emit(22);
    } else if (index == 19){
      this.stepEvent.emit(19);
    } else {
      this.stepEvent.emit(index);
    }
    
    
  }
}
