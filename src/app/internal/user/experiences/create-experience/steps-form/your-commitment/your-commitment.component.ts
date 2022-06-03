import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-your-commitment',
  templateUrl: './your-commitment.component.html',
  styleUrls: ['./your-commitment.component.scss']
})
export class YourCommitmentComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: any;
  constructor() { }

  ngOnInit(): void {
  }
  next(index) {
    if (index == 35) {
      this.stepEvent.emit(27);
    } else {
      this.stepEvent.emit(index)
    }
  }
}
