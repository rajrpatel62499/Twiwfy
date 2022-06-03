import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private translate: TranslateService,
    ) { }
  title = 'twiffy-website';

  ngOnInit() {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    AOS.init({
      duration: 1100,
      easing: "linear",
      once: true,
      mirror: false
    });
    window.addEventListener('load', () => {
      AOS.init();
    });
    
  }
}
