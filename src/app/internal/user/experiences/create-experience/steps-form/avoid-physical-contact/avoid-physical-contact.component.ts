import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avoid-physical-contact',
  templateUrl: './avoid-physical-contact.component.html',
  styleUrls: ['./avoid-physical-contact.component.scss']
})
export class AvoidPhysicalContactComponent implements OnInit {
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
