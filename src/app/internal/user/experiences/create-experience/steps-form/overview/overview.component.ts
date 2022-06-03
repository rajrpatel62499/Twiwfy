import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  next(index) {
    this.stepEvent.emit(index)
  }
}
