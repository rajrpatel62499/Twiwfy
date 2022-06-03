import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LOGIN_TYPE } from 'src/app/global/constants';
import { RegexEnum } from 'src/app/global/regexEnum';
import { AuthenticationService } from 'src/app/services/auth/auth.service';
import { FormService } from 'src/app/services/form.service';
import { VerifyOtpComponent } from '../verify-otp/verify-otp.component';
import * as counryData from '../../../country.json';
import { UnderAgeValidator } from '../../custom-validators/under-age.validator';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoginView = true;
  messageList: any;
  isEmailLogin = false;

  contryList: any = [];
  isApiCalling = false;

  today: Date = new Date();
  constructor(
    private authService: AuthenticationService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type:string, redirectTo: string},
    private fb: FormBuilder,
    private formService: FormService,
    private modalService: BsModalService,
    private ngxLoader: NgxUiLoaderService,
    private translation: TranslateService
  ) {}

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  form: FormGroup;
  ngOnInit() {
    console.log(this.data);
    
    this.openForm(this.data.type);
    this.createForm();
    this.getCustomValidationMessage();
    this.getContryList();
  }

  getCustomValidationMessage() {
    this.messageList = {
      phoneNumber: {
        pattern: this.translation.instant('ERR_VALID_MOBILE_NUMBER'),
      },
      email: {
        pattern: this.translation.instant('ERR_EMAIL_INVALID'),
      },
      fullName: {
        pattern: this.translation.instant('ERR_FULLNAME_INVALID'),
      },
      dob: {
        pattern: this.translation.instant('ERR_DOB_INVALID'),
      },
    };
  }

  getContryList() {
    this.contryList = counryData.countries;

    console.log('======>', this.contryList);
  }

  openForm(type) {
    if (type === 'Signup') {
      this.isLoginView = false;
    } else {
      this.isLoginView = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.form = this.fb.group({
      // firstname: ['' ],
      // lastname: [''],
      fullName: [''],
      dob: [''],
      

      countryCode: ['+91', [Validators.required]],
      email: ['', []],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegexEnum.phoneNumber),
        ]),
      ],
    });
    this.validationsForSignup();
  }

  async submit() {
    this.formService.markFormGroupTouched(this.form);
    if (this.form.valid) {
      // this.ngxLoader.start();
      const data: any = { 
        countryCode: this.form.value.countryCode,
     
      };
      if (!this.isEmailLogin) {
        data.mobile = this.form.value.phoneNumber;
      } else {
        data.email = this.form.value.email;
        delete data.countryCode;
      }
      this.isApiCalling = true;
      if (this.isLoginView) {
        this.authService
          .requestOtpLogin(data)
          .then((res) => {
            this.dialogRef.close();
            const initialState = {
              state: 'Login',
              redirectTo: this.data.redirectTo,
              email: data.email ? data.email : '',
              phoneNumber: data.mobile ? data.mobile : '',
              countryCode: data.countryCode ? data.countryCode : '',
              type: this.isEmailLogin
                ? LOGIN_TYPE.EMAIL
                : LOGIN_TYPE.PHONE_NUMBER,
            };
            this.modalService.show(VerifyOtpComponent, { initialState });
            setTimeout(() => {
              this.isApiCalling = false;
            }, 1500);
          })
          .catch((err) => {
            setTimeout(() => {
              this.isApiCalling = false;
            }, 1500);

            console.log('ERROR', this.isApiCalling);
          });

      } else {
  
        this.authService
          .requestOtpRegister(data)
          .then((res) => {
            this.dialogRef.close();
            
            data.fullName = this.form.value.fullName;
            data.dob = this.form.value.dob;

            const initialState = {
              state: 'Signup',
              redirectTo: this.data.redirectTo,
              fullName: data.fullName ? data.fullName : '',
              dob: data.dob ? data.dob : '',
              email: data.email ? data.email : '',
              phoneNumber: data.mobile ? data.mobile : '',
              countryCode: data.countryCode ? data.countryCode : '',
              type: this.isEmailLogin
                ? LOGIN_TYPE.EMAIL
                : LOGIN_TYPE.PHONE_NUMBER,
            };

            this.modalService.show(VerifyOtpComponent, { initialState });
            setTimeout(() => {
              this.isApiCalling = false;
            }, 1500);
          })
          .catch((err) => {
            setTimeout(() => {
              this.isApiCalling = false;
            }, 1500);

            console.log('ERROR', this.isApiCalling);
          });
      }
    }
  }

  scrollToFirst() {
    document.getElementById("form-start")?.scrollTo(0,0);
  }

  onSignupClick() {
    this.isLoginView = false;
    this.scrollToFirst();
    this.validationsForSignup();
  }

  onLoginClick() {
    this.isLoginView = true;
    this.scrollToFirst();
    this.validationsForSignup();
  }

  loginWithEmail() {
    this.isEmailLogin = true;
    this.scrollToFirst();
    this.validationsForSignup();
    this.form.get('phoneNumber').setValidators(null);
    this.form.get('phoneNumber').setErrors(null);
    this.form.get('phoneNumber').reset();
    this.form.get('countryCode').setErrors(null);
    this.form.get('countryCode').setValidators(null);
    this.form.get('countryCode').reset();
    this.form.get('email').markAsUntouched();
    this.form
      .get('email')
      .setValidators([
        Validators.required,
        Validators.pattern(RegexEnum.email),
      ]);
  }

  loginWithPhoneNumber() {
    this.isEmailLogin = false;
    this.scrollToFirst();
    this.validationsForSignup();
    this.form.get('email').setErrors(null);
    this.form.get('email').setValidators(null);
    this.form.get('email').reset();
    this.form.get('countryCode').setValue('+91');
    this.form.get('countryCode').setValidators([Validators.required]);
    this.form
      .get('phoneNumber')
      .setValidators([
        Validators.required,
        Validators.pattern(RegexEnum.phoneNumber),
      ]);
  }

  validationsForSignup() {
    if (this.isLoginView) {
      this.form.get('fullName').setErrors(null);
      this.form.get('fullName').setValidators(null);
      this.form.get('fullName').reset();
      this.form.get('dob').setErrors(null);
      this.form.get('dob').setValidators(null);
      this.form.get('dob').reset();
    } else {
      this.form
          .get('fullName')
          .setValidators([
             Validators.required, 
             Validators.pattern(RegexEnum.onlyAlphabets)
          ]);
      this.form.get('dob').setValidators([Validators.required, UnderAgeValidator]);
    }
  }
}
