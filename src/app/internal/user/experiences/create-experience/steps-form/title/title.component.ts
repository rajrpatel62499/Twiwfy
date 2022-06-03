import { Experience } from 'src/app/shared/models/experience';
import { TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: Experience;

  @ViewChild('titleForm') form: NgForm;

  constructor(public titleCasePipe: TitleCasePipe, private changeDetection: ChangeDetectorRef) {  }

  ngOnInit(): void {
  }
  next(index) {
    this.stepEvent.emit(index)
  }

  transformTitle() {
    
    this.experienceData.experiencePage.title =  this.titleCasePipe.transform(this.experienceData.experiencePage.title)
    this.changeDetection.detectChanges();
  }
}
