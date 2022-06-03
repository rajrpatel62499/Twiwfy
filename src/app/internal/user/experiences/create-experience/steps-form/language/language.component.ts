import { Experience } from 'src/app/shared/models/experience';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { APIURL } from 'src/app/global/constants';
import { ApiService } from 'src/app/services/api.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  animations: [
    trigger('fade', [
      transition("void => *", [
        style({ opacity: 0}),
        animate(400, style({ opacity: 1}))
      ])
    ])
  ]
})
export class LanguageComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: Experience;
  languages: {_id,name,check}[] = [];
  name: any = 'Choose your language';
  languageValue: any = '';
  isLanguageRequires:boolean=false;
  step: any = 1;
  selectedLanguageArr: any[] = [];

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.name = this.experienceData.basicInformation.language ? this.experienceData.basicInformation.language : 'Choose your language';
    this.languageValue = this.experienceData.basicInformation.language ? this.experienceData.basicInformation.language : '';
    this.getAllLanguage();
  }
  next(index) {
    console.log(this.experienceData.basicInformation.language);


    if (index == 10 ) {
      if (this.step === 1 && !this.experienceData.basicInformation.language)
        if (!this.languageValue) {
          this.isLanguageRequires=true;
          return;
        }
      this.stepEvent.emit(10);
    } else {
      this.stepEvent.emit(index);
    }
      
  }
  async getAllLanguage() {
    let response: any = await this.apiService.get(APIURL.GETLANGUAGE, true);
    if (response) {
      console.log(response);
      this.languages = response.data;
      for (let i = 0; i < this.languages.length; i++) {
        this.languages[i]['check'] = false;
        if(this.experienceData.basicInformation.otherLanguage.length != 0){
         if(this.experienceData.basicInformation.otherLanguage.includes(this.languages[i].name)) {
           this.languages[i]['check'] = true;
           this.selectedLanguageArr.push(this.languages[i]);
         }
        }
      }
      
    }
  }
  setLanguage(language) {
    this.name = language.name;
    this.languageValue = language.name;
    this.experienceData.basicInformation.language = language.name;

    let index = this.selectedLanguageArr.findIndex(x => x.name == language.name);
    if (index !=-1) {
      this.deleteLanguage(index);
    }

    if(this.languageValue){
      this.isLanguageRequires=false;
    }
  }
  changeStep(index) {
    this.step = index;
  }
  deleteLanguage(s) {
    this.languages.find((l) => {
      if (l.name === this.selectedLanguageArr[s].name) {
        l.check = false;
      }
    });
    this.selectedLanguageArr.splice(s, 1);
  }
  
  selectedLanguage(event, ind) {
    console.log(event, ind);
    if (event.checked) {
      this.selectedLanguageArr.push(this.languages[ind]);
      this.languages[ind]['check'] = true;
    } else {
      if (this.selectedLanguageArr.includes(this.languages[ind])) {
        this.selectedLanguageArr.find((x, index) => {
          if (x.name === this.languages[ind].name) {
            // let  i = this.selectedLanguageArr.findIndex(x)
            this.selectedLanguageArr.splice(index, 1);
            this.languages[ind]['check'] = false;
          }
        });
      }
    }
  }
  ngOnDestroy() {
    for (let i = 0; i < this.selectedLanguageArr.length; i++) {
      this.experienceData.basicInformation.otherLanguage.push(
        this.selectedLanguageArr[i].name
      );
    }
  }
}
