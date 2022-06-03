import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.scss']
})
export class ParticipationComponent implements OnInit {
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
