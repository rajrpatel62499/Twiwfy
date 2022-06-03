import { Experience } from 'src/app/shared/models/experience';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: Experience;
  
  organizationCheck: boolean = false;
  socialImpactCheck: boolean = false;
  @ViewChild('step11') form: NgForm;
  
  constructor() { }
  

  ngOnInit(): void {
    if (this.experienceData.step > 11) {
      this.organizationCheck = true;
      this.socialImpactCheck = true;
    }
  }
  next(index) {
    this.stepEvent.emit(index)
  }
}
