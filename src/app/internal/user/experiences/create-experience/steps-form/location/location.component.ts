import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  @Output() stepEvent: EventEmitter<any> = new EventEmitter();
  @Input('data')
  experienceData: any
  private geoCoder;
  @ViewChild('lValue')
  public searchElementRef: ElementRef;

  @ViewChild('step2') form: NgForm;


  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  constructor( private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
  
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      console.log(autocomplete);
      
      autocomplete.addListener("place_changed", () => {
        console.log('===========');
        
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.experienceData.yourIdea.location = place.formatted_address;
          let postalCode;
          let country;
          // let arrayAdd = place.formatted_address.split(',')
         for (let i = 0; i < place.address_components.length; i++) {
           if(place.address_components[i].types.includes("postal_code")) {
             postalCode = place.address_components[i].long_name
           }
           if(place.address_components[i].types.includes("country")) {
            country = place.address_components[i].long_name
          }
         }
          this.experienceData.experiencePage.locationDetails = {
            'country': country ? country : '',
            'street': place.address_components[0].long_name,
            'postcode': postalCode ? postalCode : '' ,
          },
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  locationChanged(event) {
    console.log(event);
    
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          console.log(this.address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
  
    });
  }
  next(index) {
    this.stepEvent.emit(index)
  }
}
