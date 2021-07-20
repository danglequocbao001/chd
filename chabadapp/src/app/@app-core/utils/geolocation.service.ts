import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { LoadingService } from './loading.service';
import { ModalController, Platform } from '@ionic/angular';

interface Location {
    lat: number;
    lng: number;
    address?: string;
}

@Injectable()

export class GeolocationService {

    geoEncoderOptions: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };

    customerLocation: Location = {
        lat: 0,
        lng: 0,
        address: "null"
    };

    centerService: Location = { lat: 10.847949, lng: 106.786794 };

    constructor(public geolocation: Geolocation,
        public nativeGeocoder: NativeGeocoder,
        public loadingService: LoadingService,
        public PlatForm: Platform,
        public modalCtrl: ModalController
    ) { }

    ngOnInit() { }

    getCurrentLocation() {
        this.PlatForm.ready().then(() => {
            this.loadingService.present('Wait a minute...');
            this.geolocation.getCurrentPosition().then((resp) => {
                this.centerService.lat = resp.coords.latitude;
                this.centerService.lng = resp.coords.longitude;
                this.getGeoEncoder(this.centerService.lat, this.centerService.lng);
                this.loadingService.dismiss();
            })
                .catch((err) => {
                    this.loadingService.dismiss();
                    console.error(err);
                })
        })
    }

    getGeoEncoder(latitude, longitude) {
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
            .then((result: NativeGeocoderResult[]) => {
                this.customerLocation.address = this.generateAddress(result[0]);
                localStorage.setItem('location', this.customerLocation.address);
            })
            .catch((err: any) => {
                console.error(err, ': because chay tren dien thoai real moi dc =))');
            });
    }

    generateAddress(addressObj) {
        let obj = [];
        let address = "";
        for (let key in addressObj) {
            obj.push(addressObj[key]);
        }
        obj.reverse();
        for (let val in obj) {
            if (obj[val].length)
                address += obj[val] + ', ';
        }
        return address.slice(0, -2);
    }

    distanceFromUserToPoint(lat1: number, lng1: number, lat2: number, lng2: number) {
        const R = 6371000;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lng2 - lng1) * (Math.PI / 180);
        const la1ToRad = lat1 * (Math.PI / 180);
        const la2ToRad = lat2 * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(la1ToRad) * Math.cos(la2ToRad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return Math.round(d / 1000);
    }

    goToMap(lat, lng) {
        window.open('https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng);
        event.stopPropagation();
    }
}