import { Injectable } from '@angular/core';
import { HttpService } from '../http_service/http-service.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private httpService: HttpService) {}
  private notesUpdated = new BehaviorSubject<boolean>(false);
  notesUpdated$ = this.notesUpdated.asObservable();
  triggerNotesRefresh() {
    this.notesUpdated.next(true);
  }
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
  changeNoteColor(data: any) {
    const token = localStorage.getItem('token');
    let endPoint: string = 'notes/changesColorNotes?access_token=' + token;
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.httpService.postApi(endPoint, data, header);
  }
  deleteNotes(data: any) {
    const token = localStorage.getItem('token');
    let endPoint: string = 'notes/trashNotes?access_token=' + token;
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.httpService.postApi(endPoint, data, header);
  }
  deleteForeverNotes(data: any) {
    const token = localStorage.getItem('token');
    let endPoint: string = 'notes/deleteForeverNotes?access_token=' + token;
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.httpService.postApi(endPoint, data, header);
  }
  getDeletedNotes() {
    const token = localStorage.getItem('token');
    let endPoint: string = 'notes/getTrashNotesList?access_token=' + token;
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.httpService.getApi(endPoint, header);
  }
  getArchiveNotesList() {
    const token = localStorage.getItem('token');
    let endPoint: string = 'notes/getArchiveNotesList?access_token=' + token;
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.httpService.getApi(endPoint, header);
  }
}
