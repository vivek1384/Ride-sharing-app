import { Component, inject, OnInit } from '@angular/core';
import {
  AcceptedRequest,
  Chat,
  Message,
  Request,
  Ride,
  User,
} from '../app.component';
import { ServiceService } from '../service.service';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-request',
  imports: [NgStyle, FormsModule, HeaderComponent],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css',
})
export class RequestComponent implements OnInit {
  service = inject(ServiceService);

  ngOnInit(): void {
    this.userId = localStorage.getItem('userid');
    this.getReqList();
    this.getUser();
  }

  reqList: Request[] = [];
  reqest: Request = new Request();
  userId: any;
  acceptedRequest: AcceptedRequest = new AcceptedRequest();
  chat: Chat = new Chat();
  message: Message = new Message();
  user: User = new User();

  getReqList() {
    this.service.getReqListbyId(this.userId).subscribe((res) => {
      if (res) {
        this.reqList = res.reverse();
        console.log(this.reqList);
      }
    });
  }

  onAccept(item: Request) {
    let isTrue = confirm(
      `Are you sure to accept request form ${item.requestName}?`
    );
    if (isTrue) {
      item.accepted = 'Accepted';
      this.service.editReq(item.id, item).subscribe((res) => {
        debugger;
        if (res) {
          this.acceptedRequest.reqId = item.id;
          this.acceptedRequest.reqName = item.requestName;
          this.acceptedRequest.seat = item.seat;
          this.acceptedRequest.start = item.start;
          this.acceptedRequest.end = item.end;
          this.service.getRide(item.ride.id).subscribe((Res) => {
            debugger;
            Res.request.push(this.acceptedRequest);
            debugger;
            Res.bookedSeat = Res.bookedSeat + this.acceptedRequest.seat;
            Res.availabelSeat = Res.availabelSeat - this.acceptedRequest.seat;
            this.service.editRide(Res.id, Res).subscribe((result) => {
              debugger;
              if (result) {
                alert('Request Accepted.');
              }
            });
          });
        }
      });
    }
  }

  getUser() {
    this.service.getUser(this.userId).subscribe((res) => {
      if (res) {
        this.user = res;
      }
    });
  }

  onDecline(item: Request) {
    let isTrue = confirm(
      `Are you sure to decline request form ${item.requestName}?`
    );
    if (isTrue) {
      item.accepted = 'Declined';
      this.service.editReq(item.id, item).subscribe((res) => {
        if (res) {
          alert('Request declined.');
        }
      });
    }
  }

  isChatOpen = true;
  messageText = '';

  crateChat(i: Request) {
    let isChat = confirm('Are you sure?');
    if (isChat) {
      clearInterval(this.closeInterval);
      this.chat = new Chat();
      this.chat.requsetName = i.requestName;
      this.chat.riderName = i.ride.userName;
      this.chat.rideId = i.ride.id;
      this.chat.requestId = i.id;
      this.chat.id = i.id;
      // console.log(this.chat)
      this.isChatOpen = true;
      this.service.addChat(this.chat).subscribe((res) => {
        if (res) {
          this.isChatOpen = true;
          i.chatCreate = true;
          this.openChat(i.id);
          this.service.editReq(i.id, i).subscribe((Res) => {
            if (Res) {
              console.log('Request Edited.');
            }
          });
        }
      });
    }
  }

  sendMessage() {
    this.message.message = this.messageText;
    this.message.name = this.user.name;
    this.chat.messages.push(this.message);
    console.log(this.chat);
    this.service.sendMessage(this.chat).subscribe((res) => {
      if (res) {
        // alert('Message Sent.');
        this.message = new Message();
        this.messageText = '';
      }
    });
  }

  closeInterval: any;

  openChat(id: any) {
    clearInterval(this.closeInterval)
    this.isChatOpen = true;
    this.service.getChat(id).subscribe((res) => {
      if (res) {
        this.chat = res;
      }
    });
    this.closeInterval = setInterval(() => {
      this.service.getChat(id).subscribe((res) => {
        if (res) {
          this.chat = res;
          // window.scrollTo(0, document.body.scrollHeight)
        }
      });
    }, 100);
  }

  closeChat() {
    // this.isChatOpen = false;
    this.chat = new Chat();
  }
}
