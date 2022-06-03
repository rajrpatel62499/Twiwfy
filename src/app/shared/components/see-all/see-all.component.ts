import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-see-all',
  templateUrl: './see-all.component.html',
  styleUrls: ['./see-all.component.scss']
})
export class SeeAllComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  multiselect(btn:HTMLButtonElement) {
    if(btn.classList.contains('active')) {
      btn.classList.remove('active');
    }else {
    btn.classList.add('active')
    }
  }
}
