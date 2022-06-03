import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-guest-requirements',
  templateUrl: './guest-requirements.component.html',
  styleUrls: ['./guest-requirements.component.scss']
})
export class GuestRequirementsComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: any;

  @ViewChild('guestRequirment') form: NgForm;

  name: any = 'Choose your Age';

  activityLevel = [
    {
      id: 1,
      name: "Light",
      value: "Light"
    },
    {
      id: 2,
      name: "Moderate",
      value: "Moderate"
    },
    {
      id: 3,
      name: "Strenuous",
      value: "Strenuous"
    },
    {
      id: 4,
      name: "Extreme",  
      value: "Extreme"
    },
  ];

  skillLevel = [
    {
      id: 1,
      name: "Beginner",
      value: "Beginner"
    },
    {
      id: 2,
      name: "Intermediate",
      value: "Intermediate"
    },
    {
      id: 3,
      name: "Advanced",
      value: "Advanced"
    },
    {
      id: 4,
      name: "Expert",
      value: "Expert"
    },
  ]
  ageArray:any = [
    // '2',
    // '3',
    // '4',
    // '5',
    // '6',
    // '7',
    // '8',
    // '9',
    // '10',
    // '11',
    // '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22'
  ]
  gueistRequirments: any = {}

  constructor() { }

  ngOnInit(): void {
    if(this.experienceData.settings.minimumAge){
      this.name = this.experienceData.settings.minimumAge;
    }
  }
  next(index) {
    this.stepEvent.emit(index)
  }

  setMinAge(age) {
    console.log(age)
    this.name = age;
    this.experienceData.settings.minimumAge = age.toString();
  }

  onCanBringKid(event) {
    this.experienceData.settings.canBringKid = event.checked;
  }

  onActivityLevelChange(event) {
    console.log(event)
    this.experienceData.settings.activityLevel = event;
  }

  onSkillLevelChange(event){
    console.log(event)
    this.experienceData.settings.skillLevel = event;
    console.log(this.experienceData)
  }

  
}
