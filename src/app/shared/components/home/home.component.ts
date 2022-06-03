import { APIURL, AppRoutes } from './../../../global/constants';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Slick, SlickContainerDirective } from 'ngx-slickjs';
import { TranslateService } from "@ngx-translate/core";
import { HomeThemeExperience, ThemeExperience } from '../../models/theme.experiences';
import { Router } from '@angular/router';

declare var $: any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isApiCalling = false;
  AppRoutes = AppRoutes;

  themeExperiences: ThemeExperience[] = [];

  @ViewChild("slickController") 
  slickContoller: SlickContainerDirective;

  constructor(public translate: TranslateService,
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef) {
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang("en");
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : "en");
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.loadExperiences();
  }

  async loadExperiences() {
    this.isApiCalling = true;
    this.apiService
    .get(APIURL.GET_PUBLIC_EXPERIENCES, false)
    .then((res: any) => {
      this.themeExperiences = res.data;
      console.log("=====>", this.themeExperiences);
      
      this.isApiCalling = false;
      
    })
    .catch(err => {
      console.log(err);
      this.isApiCalling = false;
      })

  }

  viewTheme(experience: HomeThemeExperience) {
    console.log(experience._id);
    this.router.navigate(["/",AppRoutes.VIEW_EXPERIENCE, experience._id])
  }

  multiselect(btn: HTMLButtonElement) {
    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
    } else {
      btn.classList.add('active')
    }
  }

  arrayLength = 10;
  config: Slick.Config = {
    infinite: false,
    slidesToShow: 4,
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

  //-----second-slide-config----//
  config1: Slick.Config = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // dots: true,
    autoplay: false,
    autoplaySpeed: 20000,
    mouseWheelMove: false,
    fade: true,
    cssEase: 'ease-in-out',
    touchThreshold: 500
  }

  // ------third-slide-config---//
  config2: Slick.Config = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    // dots: true,
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
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  }
  //-----fourth-slide-config----//
  config3: Slick.Config = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // dots: true,
    autoplay: false,
    autoplaySpeed: 20000,
    mouseWheelMove: false,
    // fade:true,
    // cssEase: 'ease-in-out',
    // touchThreshold: 500
  }
  //-----last-slide-config----//
  config4: Slick.Config = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // dots: true,
    autoplay: false,
    autoplaySpeed: 20000,
    mouseWheelMove: false,
    // fade:true,
    // cssEase: 'ease-in-out',
    // touchThreshold: 500
  }

  getArray(count: number) {
    return new Array(count)
  }

}
