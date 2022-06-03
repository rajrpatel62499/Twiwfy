import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-make-location-adjustment',
  templateUrl: './make-location-adjustment.component.html',
  styleUrls: ['./make-location-adjustment.component.scss']
})
export class MakeLocationAdjustmentComponent implements OnInit {
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
