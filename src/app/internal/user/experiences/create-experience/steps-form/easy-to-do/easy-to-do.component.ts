import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-easy-to-do',
  templateUrl: './easy-to-do.component.html',
  styleUrls: ['./easy-to-do.component.scss']
})
export class EasyToDoComponent implements OnInit {
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
