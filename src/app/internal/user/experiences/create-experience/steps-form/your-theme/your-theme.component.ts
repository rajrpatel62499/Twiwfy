import { Experience } from 'src/app/shared/models/experience';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIURL } from 'src/app/global/constants';
import { ApiService } from 'src/app/services/api.service';
import { CategoryData, Child, Child2, Theme } from 'src/app/shared/models/theme';

@Component({
  selector: 'app-your-theme',
  templateUrl: './your-theme.component.html',
  styleUrls: ['./your-theme.component.scss']
})
export class YourThemeComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: Experience;
  @Input('themesCat')
  themes: Theme[];
  allThemes: Theme[];

  search: any = '';
  step = 1;
  searchedResults: any;
  finalSelectedTheme: any;
  showBack: boolean = false;
  isNextButtonClicked = false;

  selectedCategory: {_id, name, children, isParent?, parentId?};

  get parentCategoryText() {
    let text = "";
    let child = '';
    let parent= '';
    if (this.finalSelectedTheme) {

      const parentId = this.finalSelectedTheme?.parentId;

      if (parentId) {
        let theme = this.getThemeById(parentId);
        if (theme) {
          theme.name ? child = theme.name : '';
          if(theme.parentId){
            let mainParent = this.getThemeById(theme.parentId);
            mainParent && mainParent.name? parent = mainParent.name : '';
          }
        }
      } else if (this.finalSelectedTheme.name) {
        parent = this.finalSelectedTheme.name;
      }
      
      let seperator = parent && child ? '|' : ''; 
      text = `${parent} ${seperator} ${child}`; 
    }

    
    return text;
  }

  @ViewChild('yourTheme') form: NgForm;

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    
    console.log(this.themes);
    // this.finalSelectedTheme = this.experienceData.yourIdea.primaryTheme ? this.experienceData.yourIdea.primaryTheme : null;
    if(this.experienceData.yourIdea.primaryTheme) {
      this.getName(this.experienceData.yourIdea.primaryTheme);
      this.step = 1;
    } 
  }

  next(index) {
    this.isNextButtonClicked = true;
    if (index != 2) {
      if (this.experienceData.yourIdea.primaryTheme)
        this.stepEvent.emit(index)
    } else {
      this.stepEvent.emit(index)
    }
  }



  async getThemes() {
    let response: any
    if (this.search) {

      this.themes = this.searchThemes(this.search);

    } else {
      !this.allThemes ? response = await this.apiService.get(APIURL.GETTHEMES, true): '';
      response ? this.allThemes = response.data : ''; 
      this.themes = this.allThemes;
    }
  
  }

  private async getName(name) {
    await this.getThemes();

    let response: any = await this.apiService.get(APIURL.PARENTCATEGORY + '/' + name, true);
    const data: CategoryData = response.data; 
    if (response) {
      console.log(response);
        this.finalSelectedTheme = this.getThemeById(data.currentCategory._id);
    }
  }


  assignChildren(category) {
    this.selectedCategory = category;
    if (category.children && category.children.length != 0) {
      this.themes = category.children;
      this.showBack = true;
    } else {
      this.showBack = false;
        this.finalSelectedTheme = category;
        this.experienceData.yourIdea.primaryTheme = category.name;
      this.step = 1;
    }
    console.log({category, themes: this.themes});

  }

  backClick() {
    this.showBack = false;
    let theme = this.getThemeById(this.selectedCategory.parentId);
    if (theme && theme.children) {
      this.themes = theme.children;
      this.selectedCategory = theme;
    } else {
      this.selectedCategory = null;
      this.themes = this.allThemes;
    }
  }

  changeStep(index) {
    if (index == 2) {
      this.selectedCategory = null;
    }
    this.step = index;
    this.getThemes();
  }

  
  private getThemeById(id:string) {
    let resultTheme: {_id, name, children, isParent?, parentId?};

    let firstLevel =  this.allThemes.find(x => x._id == id);
    if (firstLevel) {
      resultTheme = firstLevel;
      return resultTheme;
    } 

    let second: Child2[] = this.getSecondLevelChilds(); 

    let secondLevel = second.find(x => x._id == id);
    if (secondLevel) {
      resultTheme = secondLevel;
      return resultTheme;
    }
    let third: any[] = this.getThirdLevelChilds();

    let thirdLevel = third.find(x => x._id == id);
    if (thirdLevel) {
      resultTheme = thirdLevel;
      return resultTheme;
    }
  }

  
  private searchThemes(search:string) {
    let resultTheme: {_id, name, children, isParent?, parentId?}[]  = [];

    let firstLevel =  this.allThemes.filter(x => x.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1);
    resultTheme.push(...firstLevel);


    let second: Child2[] = this.getSecondLevelChilds(); 
    let secondLevel = second.filter(x => x.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1);
    resultTheme.push(...secondLevel);

    let third: any[] = this.getThirdLevelChilds();
    let thirdLevel = third.filter(x => x.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1);
    resultTheme.push(...thirdLevel);

    return resultTheme;
  }


  private getSecondLevelChilds() {
    let secondLevelChilds: Child2[] = []; 
    this.allThemes.forEach(x => x.children.forEach(y => secondLevelChilds.push(y)));
    return secondLevelChilds;
  }

  private getThirdLevelChilds() {
    let second: Child2[] = this.getSecondLevelChilds(); 
    let third: any[] = [];
    second.forEach((x)=> x.children ? x.children.forEach(y => third.push(y)) : '' )
    return third;
  }
 
}
