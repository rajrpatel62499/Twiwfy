import { Component, OnInit } from '@angular/core';
import { Slick } from 'ngx-slickjs';

@Component({
  selector: 'app-manage-experience-dashboard',
  templateUrl: './manage-experience-dashboard.component.html',
  styleUrls: ['./manage-experience-dashboard.component.scss']
})
export class ManageExperienceDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // public doughnutChartLabels: string[] = [this.dateForamt(new Date()), 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [450, 100];
  chartOptions = {
    responsive: true,
    cutoutPercentage: 30,
  };

  public donutColors=[
    {
      backgroundColor: [
        '#b2df8a',
        '#3e436d',
    ]
    }
  ];

  arrayLength = 10;
  config: Slick.Config = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 20000, 
    mouseWheelMove: false,
    responsive: [
      {
        breakpoint: 1660,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]  
  }



}
