import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-follow-cleaning-protocols',
  templateUrl: './follow-cleaning-protocols.component.html',
  styleUrls: ['./follow-cleaning-protocols.component.scss']
})
export class FollowCleaningProtocolsComponent implements OnInit {
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
