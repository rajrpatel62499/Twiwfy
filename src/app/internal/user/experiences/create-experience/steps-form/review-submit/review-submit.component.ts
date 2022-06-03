import { Subscription } from 'rxjs';
import { Experience } from 'src/app/shared/models/experience';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.scss']
})
export class ReviewSubmitComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: Experience;

  @ViewChild('reviewForm') form: NgForm;

  sub: Subscription;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    if (this.experienceData.isCompleted) {
      setTimeout(() => {
        this.form.form.patchValue({
          confirmExperience: true,
          licencePermission: true,
          myExeperience: true,
          readUnderstand: true,
          saftyRequirment: true,
          twiffyExperince: true,
        })
      }, 0);
    }

    this.sub = this.form.valueChanges.subscribe(res => {
      
      if (this.form.valid) {
        this.experienceData.isCompleted = true;
      } else {
        this.experienceData.isCompleted = false;
      }
    })
  }

  ngOnDestroy(): void {
   this.sub.unsubscribe(); 
  }

  next(index) {
    if (index === 26 && this.experienceData.yourIdea.type === 'OFFLINE') {
      this.stepEvent.emit(34);
    } else if (index === 26 && this.experienceData.yourIdea.type === 'ONLINE') {
      this.stepEvent.emit(23);
    } else {
      this.stepEvent.emit(index);
    }
   
  }
}
