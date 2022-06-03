import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {

  constructor() { }

  mainDropdown = false;

  grids = [1,2,3,4,5,6];

  ngOnInit(): void {
  }

  crateList(){
    this.mainDropdown =! this.mainDropdown ;
  }

  closeDrop(){
    this.mainDropdown = false
  }
}
