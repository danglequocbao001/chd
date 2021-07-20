import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AccountService, PERMISSIONS } from './http';
// import * as jwt_decode from 'jwt-decode';

@Injectable()
export class StorageService {
    private userSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private accountService: AccountService
    ) { }
    public clear() {
        this.userSub.next(null);
    }
    public get infoAccount(): Observable<any> {
        return this.userSub.asObservable();
    }
    public setInfoAccount() {
        if (localStorage.getItem('Authorization') !== null) {
            return this.accountService.getAccounts().subscribe((data: any) => {
                this.userSub.next(data.user);
            })
        }
        else {
            const data = {
                user: {
                    fullname: "Guest",
                    email: "guest@gmail.com",
                    role: PERMISSIONS[0].value,
                    phone_number: "000000"
                }
            }
            return this.userSub.next(data.user);
        }
    }
    public detokenUser(value) {
        //   const data = jwt_decode(value);
        return "";
    }
}
