export const HEIGHT = 1200;
export const WIDTH = 800;
export const KB = 1000;
export const MB = KB * 1000;
export const GB = MB * 1000;
export const FileType = {
    JPG: 'image/jpg',
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    PDF: 'application/pdf',
    MP4: 'video/mp4'
}

export const constants = {
    ENGLISH_LANGUAGE_CODE: 'en',
    NO_INTERNET_CONNECTION_MSG: 'No Internet Connection',
    DEFAULT_LANGUAGE: 'en',
    PASSWORD_MAX: '16',
    INITIAL_PAGE: 1,
    LIMIT: 10,
    LOCAL_TIME_STANDARD_FORMAT: 'DD/MM/YYYY hh:mm A',
};

export const LOCAL_STORAGE_KEYS = {
    TOKEN: 'token',
};

export const AUTH_ROUTES = {
    LOGIN: '/user/login',
    REGISTER: '/user/register',
    VERIFY_OTP: '/verify-otp',
    REQUEST_OTP_LOGIN: '/request-otp-login',
    REQUEST_OTP_REGISTER: '/request-otp-register',
};

export const APIURL = {
    GETTHEMES: '/host/themeCategories',
    GETLANGUAGE: '/host/language',
    GETAUDIENCE: '/host/audienceTypes',
    GETLOCATIONS: '/host/outdoorsLocation',
    UPLOADPHOTO: '/user/experiences/imageUpload',
    UPLOADVIDEO: '/user/experiences/videoUpload',
    SAVEEXPERIENCE: '/user/experiences',
    DELETE_EXPERIENCE: '/host/deleteExperiance',
    MANAGEEXPERIENCELIST:'/user/experiences',
    PARENTCATEGORY:'/user/getParentCategory',
    GET_PUBLIC_EXPERIENCES: '/home/experiences',
    GET_PUBLIC_SPECIFIC_EXPERIENCE: '/experiences',
    GET_USER_PROFILE: '/user/profile',
    UPDATE_USER_PROFILE: '/user/updateProfile'
}

export const LOGIN_TYPE = {
    PHONE_NUMBER: 'phoneNumber',
    EMAIL: 'email',
};


export const AppRoutes = {
    HOME: 'home',
    NOT_FOUND : 'notfound',
    SEE_ALL: 'seeall',
    VIEW_EXPERIENCE: 'viewexperience',
    CONFIRM_AND_PAY: 'confirm-and-pay',
    WHAT_WOULD_YOU_LIKE_TO_CHANGE: 'what-would-you-like-to-change',
    CHANGE_DATE_OR_TIME: 'change-date-or-time',
    SAVED: 'saved',
    NOTFICATIONS: 'notifications',
    ACCOUNT: 'account',
    PERSONAL_INFO: 'account/personal-info',
    LOGIN_SECURITY: 'account/login-security',
    PAYMENTS_AND_PAYOUTS: 'account/payments-and-payouts',
    NOTIFICATION_SETTINGS: 'account/notification-settings',
    PRIVACY_AND_SHARING: 'account/privacy-and-sharing',
    GLOBAL_PREFERENCES: 'account/global-preferences',
    INVITE_FIRENDS: 'account/invite-friends',
    
    MANAGE_EXPERIENCE_DASHBOARD: 'manage-experience-dashboard',
    MANAGE_CALENDER: 'manage-calendar',
    MANAGE_EXPERIENCE: 'manage-experience',
    CREATE_EXPERIENCE: 'user/create-experience'
}