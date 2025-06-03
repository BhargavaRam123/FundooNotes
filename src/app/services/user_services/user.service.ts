import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http_service/http-service.service';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: HttpServiceService) {}
  signUp(data: any) {
    let endPoint: string = 'user/userSignUp';
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.httpService.postApi(endPoint, data, header);
  }
  logIn(data: any) {
    let endPoint: string = 'user/login';
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.httpService.postApi(endPoint, data, header);
  }
}
