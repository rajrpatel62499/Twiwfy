import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorHandler } from './http-error-handler.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { constants, LOCAL_STORAGE_KEYS } from '../global/constants';
@Injectable({
    providedIn: 'root'
})

export class ApiService {
    URL = environment.apiEndPoint; // endpoint URL
    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private httpErrorHandler: HttpErrorHandler,
        private ngxLoader: NgxUiLoaderService,
        private localStorageService: LocalStorageService
    ) { }

    async getHeaders(tokenRequired, formData?) {
        const token: any = await this.localStorageService.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);
        if (tokenRequired) {
            const headers = new HttpHeaders()
                .set('authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json');
            return headers;
        } else if (formData) {
            const headers = new HttpHeaders()
                .set('authorization', 'Bearer ' + token);
            return headers;
        } else {
            const headers = new HttpHeaders()
                .set('Content-Type', 'application/json');
            return headers;
        }
    }

    // this function should be used for fetch details without header token
    async get(path: any, authorize, loaderContinue?) {
        return new Promise(async (resolve, _) => {
            const success = (res) => {
                // toaster success message
                if (res && (res.msg || res.message)) {
                    // this.toastr.success(res.msg || res.message);
                }
                if (!loaderContinue) {
                    this.ngxLoader.stop();
                }
                resolve(res);
            };
            const error = (err) => {
                return this.httpErrorHandler.handleError(path, err);
            };
            const netowrkIsConnected = await this.getNetworkConnection();
            if (netowrkIsConnected) {
                const headers = await this.getHeaders(authorize, false);
                return this.http.get(`${this.URL}${path}`, { headers })
                    .subscribe(success, error);
            } else {
                this.ngxLoader.stop();
                this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
            }
        });
    }

    // this function should be used for post details without header token
    async post(path: any, obj: any, authorize) {
        return new Promise(async (resolve,reject) => {
            const success = (res) => {
                if (res && res.message) {
                    // this.toastr.success(res.message);
                }
                this.ngxLoader.stop();
                resolve(res);
            };
            const error = (err) => { 
                reject(err);                           
                this.httpErrorHandler.handleError(path, err);
            };
            const netowrkIsConnected = await this.getNetworkConnection();
            if (netowrkIsConnected) {
                const headers = await this.getHeaders(authorize, false);
                return this.http.post<any>(`${this.URL}${path}`, obj, { headers })
                    .subscribe(success, error);
            } else {
                this.ngxLoader.stop();
                this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
            }
        });
    }

    // this function should be used for post details with header token

    async postFormDataReqWithToken(path: any, obj: any) {
        return new Promise(async (resolve, _) => {
            const success = (res) => {
                if (res && res.msg) {
                    // this.toastr.success(res.msg);
                }
                this.ngxLoader.stop();
                resolve(res);
            };
            const error = (err) => {
                return this.httpErrorHandler.handleError(path, err);
            };
            const netowrkIsConnected = await this.getNetworkConnection();
            if (netowrkIsConnected) {
                const headers = await this.getHeaders(false, true);
                return this.http.post<any>(`${this.URL}${path}`, obj, {
                    headers
                })
                    .subscribe(success, error);
            } else {
                this.ngxLoader.stop();
                this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
            }
        });
    }

    async postExportData(path: any, obj: any) {
        return new Promise(async (resolve, _) => {
            const success = (res) => {
                if (res && res.msg) {
                    // this.toastr.success(res.msg);
                }
                this.ngxLoader.stop();
                resolve(res);
            };
            const error = (err) => {
                return this.httpErrorHandler.handleError(path, err);
            };
            const options = {
                headers: await this.getHeaders(false, true),
                responseType: 'text' as 'json'
            };
            return this.http.post<any>(this.URL + path, obj, options)
                .subscribe(success, error);
        });
    }

    async delete(path: any, authorize) {
        return new Promise(async (resolve, _) => {
            const success = (res) => {
                // toaster success message
                if (res && res.msg) {
                    // this.toastr.success(res.msg);
                }
                this.ngxLoader.stop();
                resolve(res);
            };
            const error = (err) => {
                return this.httpErrorHandler.handleError(path, err);
            };
            const netowrkIsConnected = await this.getNetworkConnection();
            if (netowrkIsConnected) {
                const headers = await this.getHeaders(authorize, false);
                return this.http.delete(`${this.URL}${path}`, { headers })
                    .subscribe(success, error);
            } else {
                this.ngxLoader.stop();
                this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
            }
        });
    }

    getNetworkConnection() {
        const isOnline: boolean = navigator.onLine;
        if (isOnline) {
            return true;
        }
        return false;
    }

    async uploadFileWithProgress(path: any, obj: any) {
        const netowrkIsConnected = await this.getNetworkConnection();
        if (netowrkIsConnected) {
            const headers = await this.getHeaders(false, true);
            return this.http.post<any>(`${this.URL}${path}`, obj, {
                headers, reportProgress: true,
                observe: 'events'
            });
        } else {
            this.ngxLoader.stop();
            this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
        }
    }


    async getFile(url: any) {
        return new Promise(async (resolve, _) => {
            const success = (res) => {
                // toaster success message
                if (res && res.message) {
                    // this.toastr.success(res.message);
                }
                resolve(res);
            };
            const error = (err) => {
                return this.httpErrorHandler.handleError(url, err);
            };
            const netowrkIsConnected = await this.getNetworkConnection();
            if (netowrkIsConnected) {
                return this.http.get(url, { responseType: 'blob' })
                    .subscribe(success, error);
            } else {
                this.ngxLoader.stop();
                this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
            }
        });
    }
}
