import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-practise-good-hygiene',
  templateUrl: './practise-good-hygiene.component.html',
  styleUrls: ['./practise-good-hygiene.component.scss']
})
export class PractiseGoodHygieneComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: any;
  constructor() { }

  ngOnInit(): void {
  }
  next(index) {
    this.stepEvent.emit(index)
  }

}
