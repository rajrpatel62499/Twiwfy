import { Experience } from 'src/app/shared/models/experience';
import { ParticipationComponent } from './steps-form/participation/participation.component';
import { FormService } from './../../../../services/form.service';
import { ExperienceTypeComponent } from './steps-form/experience-type/experience-type.component';
import { LocationComponent } from './steps-form/location/location.component';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIURL } from 'src/app/global/constants';
import { ApiService } from 'src/app/services/api.service';
import { YourThemeComponent } from './steps-form/your-theme/your-theme.component';
import { NgForm } from '@angular/forms';
import { OverviewComponent } from './steps-form/overview/overview.component';
import { EasyToDoComponent } from './steps-form/easy-to-do/easy-to-do.component';
import { TechnicalQualityComponent } from './steps-form/technical-quality/technical-quality.component';
import { AudienceComponent } from './steps-form/audience/audience.component';
import { OrganisationComponent } from './steps-form/organisation/organisation.component';
import { WhatWeWillDoComponent } from './steps-form/what-we-will-do/what-we-will-do.component';
import { AboutYouComponent } from './steps-form/about-you/about-you.component';
import { ExpertiseComponent } from './steps-form/expertise/expertise.component';
import { LanguageComponent } from './steps-form/language/language.component';
import { NonProfitOrganisationComponent } from './steps-form/non-profit-organisation/non-profit-organisation.component';
import { WhatGuestsShouldBringComponent } from './steps-form/what-guests-should-bring/what-guests-should-bring.component';
import { TitleComponent } from './steps-form/title/title.component';
import { PhotosComponent } from './steps-form/photos/photos.component';
import { VideoDemostrationComponent } from './steps-form/video-demostration/video-demostration.component';
import { GuestRequirementsComponent } from './steps-form/guest-requirements/guest-requirements.component';
import { GroupSizeComponent } from './steps-form/group-size/group-size.component';
import { ContributionComponent } from './steps-form/contribution/contribution.component';
import { DurationComponent } from './steps-form/duration/duration.component';
import { GuestPricingComponent } from './steps-form/guest-pricing/guest-pricing.component';
import { PrivateGroupsComponent } from './steps-form/private-groups/private-groups.component';
import { BookingSettingsComponent } from './steps-form/booking-settings/booking-settings.component';
import { YourInformationComponent } from './steps-form/your-information/your-information.component';
import { ReviewSubmitComponent } from './steps-form/review-submit/review-submit.component';
import { CleanningGuidelinesComponent } from './steps-form/cleanning-guidelines/cleanning-guidelines.component';
import { PractiseGoodHygieneComponent } from './steps-form/practise-good-hygiene/practise-good-hygiene.component';
import { AvoidPhysicalContactComponent } from './steps-form/avoid-physical-contact/avoid-physical-contact.component';
import { MakeLocationAdjustmentComponent } from './steps-form/make-location-adjustment/make-location-adjustment.component';
import { FollowCleaningProtocolsComponent } from './steps-form/follow-cleaning-protocols/follow-cleaning-protocols.component';
import { CheckYourUnderstandingComponent } from './steps-form/check-your-understanding/check-your-understanding.component';
import { YourCommitmentComponent } from './steps-form/your-commitment/your-commitment.component';
import { YourPreviewComponent } from './steps-form/your-preview/your-preview.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-create-experience',
  templateUrl: './create-experience.component.html',
  styleUrls: ['./create-experience.component.scss'],
})
export class CreateExperienceComponent implements OnInit {
  //** Your Idea Component */
  @ViewChild('child1', { static: false }) public child1: ExperienceTypeComponent;
  @ViewChild('child2', { static: false }) public child2: LocationComponent;
  @ViewChild('child3', { static: false }) public child3: YourThemeComponent;

  //** What we are looking for Components */
  @ViewChild('child4', { static: false }) public child4: OverviewComponent;
  @ViewChild('child5', { static: false }) public child5: ExpertiseComponent;
  @ViewChild('child6', { static: false }) public child6: ParticipationComponent;
  @ViewChild('child7', { static: false }) public child7: EasyToDoComponent;
  @ViewChild('child8', { static: false }) public child8: TechnicalQualityComponent;

  //** Basic Information Components */
  @ViewChild('child9', { static: false })  public child9: LanguageComponent;
  @ViewChild('child10', { static: false }) public child10: AudienceComponent;
  @ViewChild('child11', { static: false }) public child11: OrganisationComponent; //REMOVED

  //** Experience Page Components */
  @ViewChild('child12', { static: false }) public child12: WhatWeWillDoComponent;
  @ViewChild('child13', { static: false }) public child13: AboutYouComponent;
  @ViewChild('child14', { static: false }) public child14: NonProfitOrganisationComponent; //REMOVED
  @ViewChild('child15', { static: false }) public child15: WhatGuestsShouldBringComponent;
  @ViewChild('child16', { static: false }) public child16: TitleComponent;
  @ViewChild('child17', { static: false }) public child17: PhotosComponent;

  //** Video Components */
  @ViewChild('child18', { static: false }) public child18: VideoDemostrationComponent;

  //** Setting Components */
  @ViewChild('child19', { static: false }) public child19: GuestRequirementsComponent;
  @ViewChild('child20', { static: false }) public child20: GroupSizeComponent;
  @ViewChild('child21', { static: false }) public child21: ContributionComponent;
  @ViewChild('child22', { static: false }) public child22: DurationComponent;
  @ViewChild('child23', { static: false }) public child23: GuestPricingComponent;
  
  @ViewChild('child24', { static: false }) public child24: PrivateGroupsComponent; //REMOVED
  @ViewChild('child25', { static: false }) public child25: BookingSettingsComponent; //REMOVED

  //** Your Submission Components */
  @ViewChild('child26', { static: false }) public child26: YourInformationComponent; //REMOVED
  @ViewChild('child27', { static: false }) public child27: ReviewSubmitComponent;

  //** Safety Guidlelines components **/
  @ViewChild('child28', { static: false }) public child28: CleanningGuidelinesComponent;
  @ViewChild('child29', { static: false }) public child29: PractiseGoodHygieneComponent;
  @ViewChild('child30', { static: false }) public child30: AvoidPhysicalContactComponent;
  @ViewChild('child31', { static: false }) public child31: MakeLocationAdjustmentComponent;
  @ViewChild('child32', { static: false }) public child32: FollowCleaningProtocolsComponent;
  @ViewChild('child33', { static: false }) public child33: CheckYourUnderstandingComponent;
  @ViewChild('child34', { static: false }) public child34: YourCommitmentComponent;

  //** Preview component **/
  @ViewChild('child35', { static: false }) public child35: YourPreviewComponent;

  

  refreshCount() {
    if (this.modal.yourIdea.type == 'OFFLINE') {
      this.end = 31;
    } else {
      this.end = 31- 7;
    }
    this.modal.basicInformation.isNonprofitOrg
      ? (this.end = this.end)
      : (this.end = this.end - 2);
    this.changeDetection.detectChanges();
  }

  refreshChilds() {
    this.changeDetection.detectChanges();

    this.childs = [
      null,
      this.child1,
      this.child2,
      this.child3,
      this.child4,
      this.child5,
      this.child6,
      this.child7,
      this.child8,
      this.child9,
      this.child10,
      this.child11,
      this.child12,
      this.child13,
      this.child14,
      this.child15,
      this.child16,
      this.child17,
      this.child18,
      this.child19,
      this.child20,
      this.child21,
      this.child22,
      this.child23,
      this.child24,
      this.child25,
      this.child26,
      this.child27,
      this.child28,
      this.child29,
      this.child30,
      this.child31,
      this.child32,
      this.child33,
      this.child34,
      this.child35,
    ];
    this.changeDetection.detectChanges();

  }
  public childs: any[] = [];
  step = 0;
  currentComponentIndex = 1;
  start = 1;
  end = 34;

  stepButtonClick: string = 'next';

  get progressValue() {
    return (this.start / this.end) * 100;
  }
  get currentCount() {
    return (this.end + 1) - this.start;
  }

  get nextButtonText() {
    return this.currentComponentIndex == 35
      ? 'Submit'
      : 'Next';
  }

  public activeIndices = [];
  public modal = {
    yourIdea: {
      type: 'OFFLINE',
      location: null,
      primaryTheme: null,
    },
    whatWeAreLookingFor: {
      hostedBefore: 'NotHosted',
      access: 'Doable',
      connection: 'Togetherness',
    },
    basicInformation: {
      language: null,
      otherLanguage: [],
      audienceType: 'Everyone',
      audience: [],
      partnerConfirmationCode: null,
      isNonprofitOrg: false,
      submittedNonprofit: false,
      signedNonprofitAccount: false,
      organisationName: '',

      organizationCheck: false,
      socialImpactCheck: false
    },
    experiencePage: {
      experienceDescription: null,
      fromWhere: 'Indoor',
      locationsForOutdoor: [],
      locationDetails: {
        country: null,
        street: null,
        flat: null,
        county: null,
        postcode: null,
        message: null,
        meetingPointName: null,
      },
      yourStory: null,
      hostType: 'Myself',
      organisationDescription: null,
      itemsToBring: [],
      title: null,
      coverPhoto: null,
      hostPhoto: null,
      actionPhoto: null,
      detailsPhoto: null,
      locationPhoto: null,
    },
    video: '',
    settings: {
      minimumAge: null,
      canBringKid: false,
      activityLevel: '',
      skillLevel: '',
      additionalRequirements: null,
      idRequired: false,
      maxGroupSize: 3,
      duration: '1.5',
      startTime: '2:00PM',
      availability: false,
      individualRate: null,
      groupRate: [
      ],
      allowPrivateGroups: false,
      minPrice: null,
      groupSize: null,
      cuttOffTimeForOthers: '',
      cuttOffTimeForFirst: '',
      canRequestForTimeSLots: false,
    },
    safetyGuidelines: [
      {
        question:
          'What additional guidelines apply when you and your guests are in your home or a space you manage?',
        answer: '',
      },
      {
        question:
          'The cleaning protocol is mandatory for hosts who bring guests into their homes or spaces they manage.',
        answer: '',
      },
      {
        question:
          'What is the maximum number of guests you can host during your experience?',
        answer: '',
      },
      {
        question:
          'Which of the following items of protective equipment do we recommend you wear while cleaning?',
        answer: '',
      },
      {
        question:
          'How should you adjust your experience if you’re hosting in a public space?',
        answer: '',
      },
      {
        question:
          'Cleaning is when you remove germs and dirt from surfaces. Sanitising is when you: ____________.',
        answer: '',
      },
      {
        question:
          'If you are actively hosting and test positive for COVID-19, or come in contact with someone who has tested positive for COVID-19, you should ___.',
        answer: '',
      },
      {
        question:
          'When washing your hands, scrub for at least ____ seconds with soap and warm water.',
        answer: '',
      },
      {
        question:
          'Which of the following items of protective equipment are you required to wear while hosting your experience',
        answer: '',
      },
    ],
    photos: [],
    // photos1: [],
    verificationDocument: [],
    step: 1,
    start: this.start,
    isCompleted: false,
  };

  themes: any;
  loader = false;

  setStep(index: number) {
    this.step = index;
    this.changeDetection.detectChanges();
  }

  constructor(
    public apiService: ApiService,
    public router: Router,
    public activatedRouter: ActivatedRoute,
    public formService: FormService,
    public changeDetection: ChangeDetectorRef
  ) {
    this.getThemes();
  }

  ngAfterViewInit(): void {
    this.refreshChilds();
    this.refreshCount();
  }

  ngOnInit(): void {
    let id = this.activatedRouter.snapshot.params['id'];
    console.log(id);

    if (id) {
      this.getManageExperienceDetain(id);
    }
  }

  async getThemes() {
    let response: any = await this.apiService.get(APIURL.GETTHEMES, true);
    if (response) {
      this.themes = response.data;
    }
  }

  async getManageExperienceDetain(id) {
    const response: any = await this.apiService.get(
      APIURL.MANAGEEXPERIENCELIST + '/' + id,
      true
    );
    if (response) {
      console.log('=======>', response);
      delete response.data[0]?.isVerified;
      delete response.data[0]?.isDeleted;
      delete response.data[0]?.isActive;
      this.modal = response.data[0];
      if (this.modal.step < 4) {
        this.step = 0;
      } else if (this.modal.step >= 4 && this.modal.step < 9) {
        this.step = 1;
      } else if (this.modal.step >= 9 && this.modal.step < 12) {
        this.step = 2;
      } else if (this.modal.step >= 12 && this.modal.step < 18) {
        this.step = 3;
      } else if (this.modal.step >= 18 && this.modal.step < 19) {
        this.step = 4;
      } else if (this.modal.step >= 19 && this.modal.step < 26) {
        this.step = 5;
      } else if (this.modal.step >= 26 && this.modal.step < 28) {
        this.step = 7;
      } else if (this.modal.step >= 28 && this.modal.step < 35) {
        this.step = 6;
      } else {
        this.step = 0;
      }
      this.currentComponentIndex = this.modal.step;
      this.start = this.modal.start;
      this.refreshChilds();
      this.refreshCount();
      if (this.currentComponentIndex > 11) {
        this.modal.basicInformation.organizationCheck = true;
        this.modal.basicInformation.socialImpactCheck = true;
      }


      for (let x = 2; x <= this.modal.step; x++) {
        
        this.makeIndicieActive(x);
        // if (this.modal.basicInformation.isNonprofitOrg) {
        //   this.activeIndices.push(x);
        // } else {
        //   if (x === 13 || x === 10) {
        //   } else {
        //     this.activeIndices.push(x);
        //   }
        // }
      }
      if ((this.modal.step == 26 || this.modal.step == 27) && this.modal.yourIdea.type == "OFFLINE") {
        [28,29,30,31,32,33,34].forEach(x => this.makeIndicieActive(x));
      } 


      console.log(this.activeIndices);
    }
  }

  previewClick(ind) {
    this.currentComponentIndex = ind;
  }

  goNext() {
    this.refreshChilds();
    

    this.stepButtonClick = 'next';

    if (this.childs[this.currentComponentIndex].form) {
      this.formService.markFormGroupTouched(this.childs[this.currentComponentIndex].form.form);

      // if ((this.childs[this.currentComponentIndex].form as NgForm).form.invalid)
      //   return;

      // if (this.currentComponentIndex == 15 && this.modal.experiencePage.itemsToBring.length == 0)
      //   return;

      (this.childs[this.currentComponentIndex].form as NgForm).ngSubmit.next();
    } else {
      this.childs[this.currentComponentIndex].next(this.currentComponentIndex + 1);
    }

   
  }

  goBack() {
    this.loader = true;

    this.stepButtonClick = 'back';
    this.refreshChilds();

    if (this.childs[this.currentComponentIndex].form) {
      this.childs[this.currentComponentIndex].next(this.currentComponentIndex - 1);
    } else {
      this.childs[this.currentComponentIndex].next(this.currentComponentIndex - 1);
    }
  }

  changeStep(ind) {  
    console.log(this.modal);
    
    this.loader = true;

    document.getElementById("component-header")?.scrollTo(0,0);

    if (ind === 'save') {
      this.saveExperience();
    }

    if (ind === 'save' || ind === 'back') return;

    if (ind !== 'save') {
      // when in preview page then don't change the count.

      if (this.stepButtonClick == 'next') {
        this.start = this.start + 1;
        this.modal.start = this.start;
      } else {
        this.start = this.start - 1;
        this.modal.start = this.start;
      }
    }


    this.currentComponentIndex = ind;
    this.modal.step = this.currentComponentIndex;
    
    this.makeIndicieActive(this.currentComponentIndex);
    this.loader = false;

  }

  makeIndicieActive(ind) {
    console.log(ind);
    
    if (this.stepButtonClick === 'next') {

      this.setStepper(ind);
      if (!this.modal.basicInformation.isNonprofitOrg && ind == 15) {
        this.activeIndices.findIndex(x => x == ind -3) === -1 ?  this.activeIndices.push(ind - 3) : '';
      } else if (!this.modal.basicInformation.isNonprofitOrg && ind == 12) {
        this.activeIndices.findIndex(x => x == ind -3) === -1 ?  this.activeIndices.push(ind - 3) : '';
      } else if (ind==22){
        this.activeIndices.findIndex(x => x == 19) === -1 ? this.activeIndices.push(19) : ''; 
      } else if (ind==27){
        this.activeIndices.findIndex(x => x == 22) === -1 ? this.activeIndices.push(22) : ''; 
        this.activeIndices.findIndex(x => x == 33) === -1 ? this.activeIndices.push(33) : ''; 
      } else if (ind==35){
        this.activeIndices.findIndex(x => x == 26) === -1 ? this.activeIndices.push(26) : ''; 
      } else if (ind==28 || ind == 26){
        this.activeIndices.findIndex(x => x == 22) === -1 ? this.activeIndices.push(22) : ''; // for removing contribution component.
      }
       else {
        this.activeIndices.findIndex(x => x == ind -2) === -1 ?  this.activeIndices.push(ind - 2) : '';
      }


    } else {
      const IndiceValue = this.activeIndices.indexOf(ind - 1);
      if (IndiceValue > -1) {
        this.activeIndices.splice(IndiceValue, 1);
      }

      // this.backStep(this.activeIndices.length);
      this.setStepper(ind);
    }

    console.log(this.activeIndices);

    //#region oldcode
    // for (let x = 0; x < this.modal.step - 1; x++) {
    //   if (this.modal.basicInformation.isNonprofitOrg) {
    //     this.activeIndices.push(x);
    //   } else {
    //     if (x === 13 || x === 10) {
    //     } else {
    //       this.activeIndices.push(x);
    //     }
    //   }
    // }

    // if (this.activeIndices.includes(ind - 2)) {
    //   if (ind != 'back') this.activeIndices.pop();
    //   console.log(this.activeIndices);

    //   // this.activeIndices.findIndex((temp) => {
    //   //   if(temp != -1)
    //   //  this.activeIndices.splice(temp,1);
    //   // })
    // } else {
    //   if (ind != 'save') {
    //     if (ind != 'back') {
    //       if (ind == 1) {
    //         this.activeIndices.push(0);
    //       } else if(!this.modal.basicInformation.isNonprofitOrg) {
    //           if(this.activeIndices[this.activeIndices.length - 1] === 11) {
    //             this.activeIndices.pop();
    //           }
    //       } else {
    //         this.activeIndices.push(ind - 2);
    //       }
    //     }
    //   }
    // }
    //#endregion
  }

  setStepper(ind) {
    if (ind >=1 && ind <=3) {
      this.step = 0;
    } else if (ind >= 4 && ind <=8) {
      this.step = 1;
    } else if (ind >= 9 && ind <=11) {
      this.step = 2;
    } else if (ind >= 12 && ind <=17) {
      this.step = 3;
    } else if (ind === 18) {
      this.step = 4;
    } else if (ind >= 19 && ind <=25) {
      this.step = 5;
    } else if (ind >= 28 && ind <=34) {
      this.step = 6;
    } else if (ind >=26 && ind <=27) {
      this.step = 7;
    } 
  }

  backStep(value: any) {
    if (value >= 0 && value <= 2) {
      this.step = 0;
    } else if (value >= 3 && value <= 7) {
      this.step = 1;
    } else if (value >= 8 && value < 10) {
      this.step = 2;
    } else if (
      this.modal.basicInformation.isNonprofitOrg &&
      value >= 8 &&
      value <= 10
    ) {
      this.step = 2;
    } else if (value >= 11 && value <= 14) {
      this.step = 3;
    } else if (
      this.modal.basicInformation.isNonprofitOrg &&
      value >= 11 &&
      value <= 16
    ) {
      this.step = 3;
    } else if (value == 17) {
      this.step = 4;
    } else if (value >= 18 && value <= 24) {
      this.step = 5;
    } else if (
      this.modal.yourIdea.type === 'OFFLINE' &&
      value >= 25 &&
      value <= 33
    ) {
      this.step = 6;
    }
  }



  async saveExperience() {
    delete this.modal.basicInformation.socialImpactCheck;
    delete this.modal.basicInformation.organizationCheck;

    if (this.modal.yourIdea.type === 'ONLINE') {
      delete this.modal.safetyGuidelines;
    }
    try {
      let response: any = await this.apiService.post(APIURL.SAVEEXPERIENCE, this.modal, true);
      if (response) {
        console.log(response);
        this.router.navigate(['manage-experience']);
      }
    } catch (error) {
      console.log(error);
    }
  }




}
