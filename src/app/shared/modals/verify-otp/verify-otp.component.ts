import { BackendResponse } from './../../models/backend-response';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { APIURL, LOCAL_STORAGE_KEYS, LOGIN_TYPE } from 'src/app/global/constants';
import { AuthenticationService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Experience } from '../../models/experience';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {
  otp;
  otpValidation;
  type;
  email;
  phoneNumber;
  countryCode;
  state;

  fullName;
  dob;

  redirectTo: string;

  config = {
    allowappNumbersOnly: true,
    length: 6,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  LOGIN_TYPE = LOGIN_TYPE;
  isApiCalling = false;

  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  otpLength = 6;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private modalRef: BsModalRef,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private apiService: ApiService,
    private dataService: DataService
  ) { }

  ngOnInit(): void { }

  closeModal() {
    this.modalRef.hide();
  }

  onOtpChange(otp) {
    this.otp = otp;
  }
  async verifyOtp() {
    this.otpValidation = false;
    // if (this.otp.length === 6) {
    const data: any = { code: this.otp };
    if (this.type === LOGIN_TYPE.EMAIL) {
      data.email = this.email;
    } else {
      data.mobile = this.phoneNumber;
      data.countryCode = this.countryCode;
    }

    try {
      this.isApiCalling = true;
      const response = await this.authService.verifyOtp(data);
      if (response) {
        delete data.code;
        if (this.state === 'Login') {
          this.loginUser(data);
        } else {
          this.registerUser(data);
        }
      }
      this.isApiCalling = false;
    } catch (error) {
      this.isApiCalling = false;
    }


  }

  async loginUser(data) {
    try {

      this.isApiCalling = true;
      const userLogin: any = await this.authService.login(data);
      if (userLogin) {
        this.modalRef.hide();
        this.localStorageService.setDataInIndexedDB(
          LOCAL_STORAGE_KEYS.TOKEN,
          userLogin.data.accessToken
        );
        // this.dataService.fetchExperienceList();
        this.authService.authUpdate.next(true);
        this.toastrService.success("Login successfully");
      }
      this.isApiCalling = false;
    } catch (error) {
      this.isApiCalling = false;

    }
  }

  async registerUser(data) {
    data.fullName = this.fullName;
    data.dob = this.dob;

    try {
      this.isApiCalling = true;
      const userLogin: any = await this.authService.register(data);
      if (userLogin) {
        this.modalRef.hide();
        this.localStorageService.setDataInIndexedDB(
          LOCAL_STORAGE_KEYS.TOKEN,
          userLogin.data.accessToken
        );
        this.authService.authUpdate.next(true);
        this.toastrService.success("Registered Successfully");
        this.router.navigateByUrl(`/${this.redirectTo}`);
      }
      this.isApiCalling = false;
    } catch (error) {
      this.isApiCalling = false;
    }
  }


  async resendOtp() {
    const data: any = {};
    if (this.type === LOGIN_TYPE.EMAIL) {
      data.email = this.email;
    } else {
      data.mobile = this.phoneNumber;
      data.countryCode = this.countryCode;
    }
    if (this.state === 'Login') {
      this.authService
        .requestOtpLogin(data)
        .then((res: any) => {
          console.log(res);
          if (res.data) {
            this.toastrService.success("OTP resend successfully");
          }
        })
        .catch((err) => {
          console.log('Error ==>', err);
        });
    } else {
      this.authService.requestOtpRegister(data).then((res: any) => {
        if (res.data) {
          this.toastrService.success("OTP resend successfully");
        }
      })
    }
  }
}
