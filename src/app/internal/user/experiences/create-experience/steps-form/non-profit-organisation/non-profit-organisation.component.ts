import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-non-profit-organisation',
  templateUrl: './non-profit-organisation.component.html',
  styleUrls: ['./non-profit-organisation.component.scss']
})
export class NonProfitOrganisationComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: any;
  constructor() { }

  @ViewChild('nonProfit') form: NgForm;

  ngOnInit(): void {
  }
  next(index) {
    this.stepEvent.emit(index)
  }

  changeHostType(value){   
    // console.log(value)
  }
}
