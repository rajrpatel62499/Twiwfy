import { Component, OnInit } from '@angular/core';
import { AppRoutes } from 'src/app/global/constants';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  AppRoutes = AppRoutes;
  constructor() { }

  ngOnInit(): void {
  }

}
