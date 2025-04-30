import { Injectable } from '@angular/core';
import { Chat, Request, Ride, User } from './app.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  url = 'http://192.168.1.138:3000/';

  addUser(d: User) {
    return this.http.post(`${this.url}user`, d);
  }
  updateUser(d: User, i: any) {
    return this.http.put(`${this.url}user` + i, d);
  }
  getAllUser() {
    return this.http.get<User[]>(`${this.url}user`);
  }
  deleteUser(i: any) {
    return this.http.delete(`${this.url}user/` + i);
  }
  getUser(i: any) {
    return this.http.get<User>(`${this.url}user/` + i);
  }
  getUserbyPass(e: string, p: string) {
    return this.http.get<User[]>(`${this.url}user?email=${e}&password=${p}`);
  }
  getRidelist() {
    return this.http.get<Ride[]>(`${this.url}ride`);
  }
  getRide(i: any) {
    return this.http.get<Ride>(`${this.url}ride/` + i);
  }
  addRide(d: Ride) {
    return this.http.post(`${this.url}ride`, d);
  }
  editRide(i: any, d: Ride) {
    return this.http.put(`${this.url}ride/` + i, d);
  }
  deleteRide(i: any) {
    return this.http.delete(`${this.url}ride/` + i);
  }
  getReqlist() {
    return this.http.get<Request[]>(`${this.url}request`);
  }
  getReq(i: any) {
    return this.http.get<Request>(`${this.url}request/` + i);
  }
  addReq(d: Request) {
    return this.http.post(`${this.url}request`, d);
  }
  editReq(i: any, d: Request) {
    return this.http.put(`${this.url}request/` + i, d);
  }
  deleteReq(i: any) {
    return this.http.delete(`${this.url}request/` + i);
  }
  getReqListbyId(i: any) {
    return this.http.get<Request[]>(`${this.url}request?ride.userId=${i}`);
  }
  getRideListbyId(i: any) {
    return this.http.get<Ride[]>(`${this.url}ride?userId=${i}`);
  }
  getReqListForHistory(i: any) {
    return this.http.get<Request[]>(`${this.url}request?requestId=` + i);
  }
  addChat(d: Chat) {
    return this.http.post(`${this.url}chat`, d);
  }
  sendMessage(d: Chat) {
    return this.http.put(`${this.url}chat/` + d.id, d);
  }
  getChat(id: any) {
    return this.http.get<Chat>(`${this.url}chat/` + id);
  }
  deleteChat(id: any) {
    return this.http.delete(`${this.url}chat/` + id);
  }
}
