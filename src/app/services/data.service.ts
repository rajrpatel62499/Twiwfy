import { ApiService } from 'src/app/services/api.service';
import { Experience } from 'src/app/shared/models/experience';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { APIURL } from '../global/constants';
import { BackendResponse } from '../shared/models/backend-response';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  

  constructor(private apiService: ApiService) { }

 
  private mangeExperienceListSubj = new BehaviorSubject<Experience[]>([]);
  public manageExperienceList$ = this.mangeExperienceListSubj.asObservable();

  updateMangeExperienceList(value: Experience[]) {
    this.mangeExperienceListSubj.next(value);
  }

 
  async fetchExperienceList() {

    this.apiService.get(APIURL.MANAGEEXPERIENCELIST, true)
      .then((response: BackendResponse<Experience[]>) => {
        this.updateMangeExperienceList(response.data)
        console.log('=======>', response);
      })
      .catch(error => {
        console.log(error);
      })
  }
}
