import { AbstractControl } from '@angular/forms';

export function UnderAgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let date: Date = control.value;

    if (!date) return { 'required' : true}; 
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    console.log(date);
    
    if (!isDate18orMoreYearsOld(day, month, year)){
        console.log("underAge");
        
        return { 'underAge': true};
    }
 
    return null;
}

function isDate18orMoreYearsOld(day, month, year) {
    console.log({
        day,month,year
    });
    
    return new Date(year+18, month-1, day) <= new Date();
}