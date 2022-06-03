import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-what-guests-should-bring',
  templateUrl: './what-guests-should-bring.component.html',
  styleUrls: ['./what-guests-should-bring.component.scss']
})
export class WhatGuestsShouldBringComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: any;
  item: any;

  @ViewChild('guestsForm') form: NgForm;

  isNextButtonClicked = false;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    $('#addItem').on('keypress', function(e) {
      return e.which !== 13;
    });
  }

  next(index) {
    this.isNextButtonClicked = true;
    if (index === 16 && this.experienceData.experiencePage.itemsToBring.length === 0) {
    } else if (index === 14) {
      if (this.experienceData.basicInformation.isNonprofitOrg) {
        this.stepEvent.emit(index)
      } else {
        this.stepEvent.emit(13)
      }
    } else {
      this.stepEvent.emit(index)
    }
  }

  deleteItems(ind) {
    this.experienceData.experiencePage.itemsToBring.splice(ind, 1);
  }
  
  showInput = false;
  addItems(showInput: boolean) {
    this.showInput = showInput;
    this.cdr.detectChanges();
    if (this.item) {
      this.experienceData.experiencePage.itemsToBring.push(this.item)
      this.item = '';
    }
  }

}
