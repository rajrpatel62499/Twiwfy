import { Experience } from 'src/app/shared/models/experience';
import { Input, ChangeDetectorRef } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  @Input('activeIndices')
  activeIndices: any

  @Input('currentComponentIndex')
  currentComponentIndex: number

  @Input('data')
  modal: Experience

  @Input('step')
  step: number

  @Output() setStepEvent: EventEmitter<any> = new EventEmitter();

  constructor(private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
  }


  setStep(index) {
    this.setStepEvent.emit(index);
    this.changeDetection.detectChanges();
  }
}
