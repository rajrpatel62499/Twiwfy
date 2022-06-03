import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-technical-quality',
  templateUrl: './technical-quality.component.html',
  styleUrls: ['./technical-quality.component.scss']
})
export class TechnicalQualityComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: any
  constructor() { }

  ngOnInit(): void {
  }
  next(index) {
    this.stepEvent.emit(index)
  }
}
