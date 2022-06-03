// import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_KEYS } from '../global/constants';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorHandler {
    constructor(
        private toastr: ToastrService,
        // private ngxLoader: NgxUiLoaderService,
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    fixedMessage = new BehaviorSubject<any>(null);

    async handleError(serviceName = '', error: HttpErrorResponse, endpoint = 'operation') {
        const errorMessage = error.error.message;
        this.toastr.error(errorMessage);
        switch (error.status) {
            case 400:
                return throwError(error);
            case 401:
                localStorage.clear();
                await this.localStorageService.removeDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);
                this.router.navigate(['/auth']);
                return;
            case 403:
                return throwError(error);
            case 404:
                return throwError(error);
            case 500:
                return throwError(error);
            default:
        }

        return throwError(error);
    }
}
