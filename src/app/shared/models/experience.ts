import { UploadedFile } from "./image-upload";

  
export  interface Experience {
    photos: UploadedFile[];
    // photos1: any[];
    yourIdea: YourIdea;
    whatWeAreLookingFor: WhatWeAreLookingFor;
    basicInformation: BasicInformation;
    experiencePage: ExperiencePage;
    settings: Settings;
    step: number;
    start: number;
    status: string;
    isCompleted: boolean;
    isVerified: boolean;
    verificationDocument: UploadedFile[];
    isActive: boolean;
    isDeleted: boolean;
    _id: string;
    video: string;
    safetyGuidelines: SafetyGuideline[];
    // addedBy: string | { _id: string, fullName: string};
    addedBy: any;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  interface SafetyGuideline {
    _id: string;
    question: string;
    answer: string;
  }
  
  interface Settings {
    canBringKid: boolean;
    idRequired: boolean;
    allowPrivateGroups: boolean;
    canRequestForTimeSLots: boolean;
    minimumAge?: any;
    activityLevel: string;
    skillLevel: string;
    additionalRequirements: string;
    maxGroupSize: number;
    duration: string;
    startTime: string;
    individualRate: number;
    groupRate: GroupRate[];
    minPrice?: any;
    groupSize?: any;
    cuttOffTimeForOthers: string;
    cuttOffTimeForFirst: string;
    availability?: boolean;
  }
  
  export interface GroupRate {
    _id?: string;
    lowerSize: number;
    upperSize: number;
    discount: number;
    amount?: number;
  }
  
  interface ExperiencePage {
    locationDetails: LocationDetails;
    locationsForOutdoor: any[];
    organisationDescription?: any;
    itemsToBring: string[];
    experienceDescription: string;
    fromWhere: string;
    yourStory: string;
    hostType: string;
    title: string;
    coverPhoto?: any;
    hostPhoto?: any;
    actionPhoto?: any;
    detailsPhoto?: any;
    locationPhoto?: any;
  }
  
  interface LocationDetails {
    country: string;
    street: string;
    postcode: string;
  }
  
  interface BasicInformation {
    language: string;
    otherLanguage: any[];
    audience: any[];
    isNonprofitOrg: boolean;
    submittedNonprofit: boolean;
    signedNonprofitAccount: boolean;
    audienceType: string;
    partnerConfirmationCode?: any;
    organisationName: string;

    organizationCheck?: boolean;
    socialImpactCheck?: boolean;
  }
  
  interface WhatWeAreLookingFor {
    hostedBefore: string;
    access: string;
    connection: string;
  }
  
  interface YourIdea {
    type: string;
    location: string;
    primaryTheme: string;
  }