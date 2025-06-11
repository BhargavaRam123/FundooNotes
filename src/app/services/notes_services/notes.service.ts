import { Injectable } from '@angular/core';
import { HttpService } from '../http_service/http-service.service';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private httpService: HttpService) {}
  postNotes(data: any) {
    const token = localStorage.getItem('token');
    let endPoint: string = 'notes/addNotes?access_token=' + token;
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.httpService.postApi(endPoint, data, header);
  }
  getUserNotes() {
    const token = localStorage.getItem('token');
    let endPoint: string = 'notes/getNotesList?access_token=' + token;
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.httpService.getApi(endPoint, header);
  }
  archiveNotes(data: any) {
    const token = localStorage.getItem('token');
    let endPoint: string = 'notes/archiveNotes?access_token=' + token;
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.httpService.postApi(endPoint, data, header);
  }
}
