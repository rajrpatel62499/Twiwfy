import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.scss']
})
export class ContributionComponent implements OnInit {

  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: any;
  name: any = 'Choose group size';
  @ViewChild('contribution') form: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  next(index) {
    this.stepEvent.emit(index)
  }

}
