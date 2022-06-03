export const RegexEnum = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    passwordValidation: '^(?=.{8,15})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^!&*+=~`*]).*$',
    urlValidation: '^(http|https)://.*$',
    onlyAlphabets: /^[a-zA-Z ]*$/,
    notOnlyNumeric: /[A-Za-z]+/,
    phoneNumber: '^[0-9]{10,12}$'
};
