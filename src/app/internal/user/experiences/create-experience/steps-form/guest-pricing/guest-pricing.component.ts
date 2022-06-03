import { state, trigger, transition, animate, style } from '@angular/animations';
import { Experience, GroupRate } from 'src/app/shared/models/experience';
import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-guest-pricing',
  templateUrl: './guest-pricing.component.html',
  styleUrls: ['./guest-pricing.component.scss'],
  animations: [
    trigger('fade', [
      transition("void => *", [
        style({ opacity: 0 }),
        animate(400, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class GuestPricingComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: Experience;
  hideBox: boolean = false;

  @ViewChild('guestPrincing') form: NgForm;

  nextButtonClicked = false;

  get estimatedEarnings() {
    return +(this.experienceData.settings.individualRate - (this.experienceData.settings.individualRate) * 0.2).toFixed(2);
  }


  constructor() { }

  ngOnInit(): void { }
  hideBoxRate() {
    this.hideBox = true;
  }
  next(index) {
    this.nextButtonClicked = true;
    // const errors = this.validatePage();
    // if (errors) return;
    if (index === 24 && this.experienceData.yourIdea.type === 'OFFLINE')
      this.stepEvent.emit(28);
    else if (index === 24 && this.experienceData.yourIdea.type === 'ONLINE') {
      this.stepEvent.emit(27);
    } else {
      this.stepEvent.emit(index);
    }

  }


  validatePage(): boolean {
    let errors: string[] = []
    this.experienceData.settings.groupRate.forEach((groupRate, index) => {
      if (groupRate.lowerSize > this.experienceData.settings.maxGroupSize || groupRate.lowerSize < 2) {
        errors.push(`error`);
      }
    })

    if (errors.length > 0) {
      return true;
    } else {
      return false;
    }
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

  addGroupRate() {
    if (this.experienceData.settings.groupRate.length < 2) {
      let groupRate: GroupRate = {
        lowerSize: 2,
        upperSize: this.experienceData.settings.maxGroupSize,
        discount: 20,
        amount: this.estimatedEarnings
      }
      this.experienceData.settings.groupRate.push(groupRate);
    }
  }

  deleteGroupRate(index) {
    this.experienceData.settings.groupRate.splice(index, 1);
  }

  onGroupDiscountChange(groupRate: GroupRate) {
    groupRate.amount = +(this.experienceData.settings.individualRate - (this.experienceData.settings.individualRate * groupRate.discount * 0.01)).toFixed(2);
    console.log(this.form.form);
    console.log(this.experienceData);


  }

}
