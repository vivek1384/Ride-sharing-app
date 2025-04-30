import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'carRide';
}

export class User {
  id: any;
  name: string;
  email: string;
  password: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.email = '';
    this.password = '';
  }
}

export class Ride {
  id: any;
  start: string;
  end: string;
  via1: string;
  via2: string;
  via3: string;
  userName: string;
  userId: any;
  date : Date
  seat: number;
  bookedSeat: number;
  availabelSeat: number;
  request: AcceptedRequest[];
  constructor() {
    this.id = undefined;
    this.start = '';
    this.end = '';
    this.via1 = '';
    this.via2 = '';
    this.via3 = '';
    this.userName = '';
    this.userId = undefined;
    this.date = new Date();
    this.seat = 0;
    this.bookedSeat = 0;
    this.availabelSeat = 0;
    this.request = [];
  }
}

export class Request {
  id: any;
  ride: Ride;
  requestName: string;
  requestId: any;
  start: string;
  end: string;
  accepted: string;
  seat: number;
  completed: boolean;
  chatCreate: boolean;
  constructor() {
    this.id = undefined;
    this.ride = new Ride();
    this.requestName = '';
    this.start = '';
    this.end = '';
    this.accepted = '';
    this.seat = 0;
    this.completed = false;
    this.chatCreate = false;
  }
}

export class AcceptedRequest {
  reqId: any;
  reqName: string;
  reqUserId: any;
  start: string;
  end: string;
  seat: number;
  markedAsC: boolean;
  constructor() {
    this.reqId = undefined;
    this.reqName = '';
    this.start = '';
    this.end = '';
    this.seat = 0;
    this.markedAsC = false;
  }
}

export class Chat {
  id: any;
  requsetName: string;
  riderName: string;
  messages: Message[];
  rideId: any;
  requestId: any;
  constructor() {
    this.id = undefined;
    this.requsetName = '';
    this.riderName = '';
    this.messages = [];
  }
}

export class Message {
  name: string;
  message: string;
  constructor() {
    this.name = '';
    this.message = '';
  }
}
