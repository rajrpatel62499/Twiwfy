import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-experience-type',
  templateUrl: './experience-type.component.html',
  styleUrls: ['./experience-type.component.scss']
})
export class ExperienceTypeComponent implements OnInit {
  @Input('data')
  experienceData: any

  activeIndex = 1;
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();

  @Output() changeExperienceType: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.activeIndex = this.experienceData?.yourIdea?.type === 'OFFLINE' ? this.activeIndex = 2 : this.activeIndex = 1; 
  }
  setType(index) {
    if(index === 1) {
      this.activeIndex = 1;
      this.experienceData.yourIdea.type = 'ONLINE'
    } else {
      this.activeIndex = 2;
      this.experienceData.yourIdea.type = 'OFFLINE'
    }
    this.changeExperienceType.emit();
  }
  next() {
    if(this.experienceData.yourIdea.type === "") {
      this.experienceData.yourIdea.type = 'ONLINE'
    }
    this.stepEvent.emit(2)
  }
}
