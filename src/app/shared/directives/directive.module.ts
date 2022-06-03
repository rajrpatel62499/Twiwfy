
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { OnlyNumbersDirective } from './numbers-only.directive';
import { InputRestrictionDirective } from './InputRestrictionDirective.directive';
@NgModule({
    declarations: [
        OnlyNumbersDirective,
        InputRestrictionDirective
    ],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        BsDropdownModule
    ],
    exports: [
        OnlyNumbersDirective,
        InputRestrictionDirective
    ],
})
export class DirectiveModule { }
