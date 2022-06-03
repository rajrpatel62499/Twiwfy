import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cleanning-guidelines',
  templateUrl: './cleanning-guidelines.component.html',
  styleUrls: ['./cleanning-guidelines.component.scss']
})
export class CleanningGuidelinesComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: any;
  constructor() { }

  ngOnInit(): void {
  }
  next(index) {
    if (index == 27) {
      this.stepEvent.emit(23);
    } else {
      this.stepEvent.emit(index)
    }
  }
}
