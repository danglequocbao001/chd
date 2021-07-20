import { IPageRequest } from '../global';

export interface IAccount {
    username?: string;
    password?: string;
}

export interface IGetAccounts {
    user: {
        fullname: string,
        email: string,
        role: string,
        phone_number: string,
    }
  
}


export interface Role {
    valueView: string;
    value: any;
}

export interface IPageAccount extends IPageRequest {
    role?: string;
}