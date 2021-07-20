import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

export const API_URL = new InjectionToken<string>('apiUrl');

export const APICONFIG = {
  BASEPOINT: environment.apiUrl,
  AUTH: {
    LOGIN: '/app/auth/login',
    SIGNUP: `/app/auth/signup`,
    TYPE_OF_USER: `/app/auth/users/profile`,
    RESET_PASSWORD_EMAIL: `/app/reset_password/send_code`,
    CHECK_CODE_RESET: `/app/reset_password/check_code`,
    RESET_PASSWORD: `/app/reset_password/reset_password`,
    COUNTRY_CODE: `/app/country_codes`,
    UPDATE_AVATAR: `/app/app_users/update_avatar`,
    CHANGE_PASS: `/app/app_users/change_password`,
  },
  ACCOUNT: {
    PROFILE_USER: `/app/app_users/profile`,
    UPDATE_PROFILE: `/app/app_users/update_profile`,
    UPDATE_PASS: `/app/users/update_password`,
    GETDETAIL: (id) => `/app/users/${id}`,
    EDIT: (id) => `/app/users/${id}`,
    DELETE: (id) => `/app/users/${id}`,
    UPDATE_PREMIUM: (id) => `/app/users/request_upgrade`,
    CONTACT_ADMIN: `/app/interact_email/submit`
  },
  CHABAD: {
    GET: `/app/chabads`,
    GET_DETAIL: id => `/app/chabads/${id}`
  },
  EVENTS: {
    GET: `/app/events`,
    GET_DETAIL: (id) => `/app/events/${id}`,
    JOIN: `/app/attention_logs`,
    CANCEL: `/app/attention_logs/cancel`
  },
  DONATES: {
    DONATE:`/app/donation_logs`  
  },
  MATCH_USERS: {
    GET: `/app/matches/match`
  },
  FOOD: {
    GET: `/app/foods`
  },
  HISTORY: {
    GET_SERVICES: `/app/attention_logs/service_history`,
    GET_EVENTS: `/app/attention_logs/event_history`
  },
  ORDER: {
    GET_ALL: `/app/orders`,
    GET: (id) => `/app/orders/${id}`,
    CREATE: `/app/orders`,
    DELETE: (id) => `/app/orders/${id}`,
  }
};

