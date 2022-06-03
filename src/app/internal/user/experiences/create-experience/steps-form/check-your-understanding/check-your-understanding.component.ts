import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-check-your-understanding',
  templateUrl: './check-your-understanding.component.html',
  styleUrls: ['./check-your-understanding.component.scss']
})
export class CheckYourUnderstandingComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: any;
  constructor() { }

  @ViewChild('ubderstanding') form: NgForm;

  ngOnInit(): void {
  }
  next(index) {
    this.stepEvent.emit(index)
  }
  valueChange(value,index) {
    this.experienceData.safetyGuidelines[index].answer = value;
  }
}
