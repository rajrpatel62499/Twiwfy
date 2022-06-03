import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor() { }

  Newnotifications = [1,2,3,4,5]
  Oldnotifications = [1,2,3,4,5]

  ngOnInit(): void {
  }

}
