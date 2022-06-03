import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.scss']
})
export class ExpertiseComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: any

  @ViewChild('expertise') form: NgForm;

  constructor() { }

  ngOnInit(): void {
  }
  next(index) {
    this.stepEvent.emit(index)
  }
  changeHosted(index) {
    switch (index) {
      case 1:
        this.experienceData.whatWeAreLookingFor.hostedBefore = "HostedProfessionally"
        break;
      case 2:
        this.experienceData.whatWeAreLookingFor.hostedBefore = "HostedWithFamily"
        break;
      case 3:
      this.experienceData.whatWeAreLookingFor.hostedBefore = "NotHosted"
        break;
    }

  }
}
