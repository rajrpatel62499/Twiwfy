import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { ExperiencesComponent } from './experiences/experiences.component';
import { CreateExperienceComponent } from './experiences/create-experience/create-experience.component';
import { ExperienceTypeComponent } from './experiences/create-experience/steps-form/experience-type/experience-type.component';
import { LocationComponent } from './experiences/create-experience/steps-form/location/location.component';
import { YourThemeComponent } from './experiences/create-experience/steps-form/your-theme/your-theme.component';
import { OverviewComponent } from './experiences/create-experience/steps-form/overview/overview.component';
import { ExpertiseComponent } from './experiences/create-experience/steps-form/expertise/expertise.component';
import { ParticipationComponent } from './experiences/create-experience/steps-form/participation/participation.component';
import { EasyToDoComponent } from './experiences/create-experience/steps-form/easy-to-do/easy-to-do.component';
import { TechnicalQualityComponent } from './experiences/create-experience/steps-form/technical-quality/technical-quality.component';
import { LanguageComponent } from './experiences/create-experience/steps-form/language/language.component';
import { AudienceComponent } from './experiences/create-experience/steps-form/audience/audience.component';
import { OrganisationComponent } from './experiences/create-experience/steps-form/organisation/organisation.component';
import { WhatWeWillDoComponent } from './experiences/create-experience/steps-form/what-we-will-do/what-we-will-do.component';
import { AboutYouComponent } from './experiences/create-experience/steps-form/about-you/about-you.component';
import { NonProfitOrganisationComponent } from './experiences/create-experience/steps-form/non-profit-organisation/non-profit-organisation.component';
import { WhatGuestsShouldBringComponent } from './experiences/create-experience/steps-form/what-guests-should-bring/what-guests-should-bring.component';
import { TitleComponent } from './experiences/create-experience/steps-form/title/title.component';
import { PhotosComponent } from './experiences/create-experience/steps-form/photos/photos.component';
import { YourPreviewComponent } from './experiences/create-experience/steps-form/your-preview/your-preview.component';
import { VideoDemostrationComponent } from './experiences/create-experience/steps-form/video-demostration/video-demostration.component';
import { GuestRequirementsComponent } from './experiences/create-experience/steps-form/guest-requirements/guest-requirements.component';
import { GroupSizeComponent } from './experiences/create-experience/steps-form/group-size/group-size.component';
import { ContributionComponent } from './experiences/create-experience/steps-form/contribution/contribution.component';
import { DurationComponent } from './experiences/create-experience/steps-form/duration/duration.component';
import { GuestPricingComponent } from './experiences/create-experience/steps-form/guest-pricing/guest-pricing.component';
import { PrivateGroupsComponent } from './experiences/create-experience/steps-form/private-groups/private-groups.component';
import { BookingSettingsComponent } from './experiences/create-experience/steps-form/booking-settings/booking-settings.component';
import { YourInformationComponent } from './experiences/create-experience/steps-form/your-information/your-information.component';
import { ReviewSubmitComponent } from './experiences/create-experience/steps-form/review-submit/review-submit.component';
import { CleanningGuidelinesComponent } from './experiences/create-experience/steps-form/cleanning-guidelines/cleanning-guidelines.component';
import { PractiseGoodHygieneComponent } from './experiences/create-experience/steps-form/practise-good-hygiene/practise-good-hygiene.component';
import { AvoidPhysicalContactComponent } from './experiences/create-experience/steps-form/avoid-physical-contact/avoid-physical-contact.component';
import { MakeLocationAdjustmentComponent } from './experiences/create-experience/steps-form/make-location-adjustment/make-location-adjustment.component';
import { FollowCleaningProtocolsComponent } from './experiences/create-experience/steps-form/follow-cleaning-protocols/follow-cleaning-protocols.component';
import { CheckYourUnderstandingComponent } from './experiences/create-experience/steps-form/check-your-understanding/check-your-understanding.component';
import { YourCommitmentComponent } from './experiences/create-experience/steps-form/your-commitment/your-commitment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { LeftSidebarComponent } from './experiences/create-experience/left-sidebar/left-sidebar.component';



const routes: Routes = [
  {
    path: '', component: UserComponent
  },
  {
    path: 'experiences', component: ExperiencesComponent
  },
  {
    path: 'create-experience', component: CreateExperienceComponent
  },
  {
    path: 'create-experience/:id', component: CreateExperienceComponent
  }
];

@NgModule({
  declarations: [UserComponent, CreateExperienceComponent, ExperienceTypeComponent, LocationComponent, YourThemeComponent, OverviewComponent, ExpertiseComponent, ParticipationComponent, EasyToDoComponent, TechnicalQualityComponent, LanguageComponent, AudienceComponent, OrganisationComponent, WhatWeWillDoComponent, AboutYouComponent, NonProfitOrganisationComponent, WhatGuestsShouldBringComponent, TitleComponent, PhotosComponent, YourPreviewComponent, VideoDemostrationComponent, GuestRequirementsComponent, GroupSizeComponent, ContributionComponent, DurationComponent, GuestPricingComponent, PrivateGroupsComponent, BookingSettingsComponent, YourInformationComponent, ReviewSubmitComponent, CleanningGuidelinesComponent, PractiseGoodHygieneComponent, AvoidPhysicalContactComponent, MakeLocationAdjustmentComponent, FollowCleaningProtocolsComponent, CheckYourUnderstandingComponent, YourCommitmentComponent, LeftSidebarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class UserModule { }
