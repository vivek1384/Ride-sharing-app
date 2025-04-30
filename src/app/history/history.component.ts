import { Component, inject, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Chat, Message, Request, Ride, User } from '../app.component';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-history',
  imports: [NgStyle, FormsModule, HeaderComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {
  service = inject(ServiceService);

  ngOnInit(): void {
    this.userId = localStorage.getItem('userid');
    this.getReqList();
    this.getUser();
  }

  userId: any = '';
  reqList: Request[] = [];
  ride: Ride = new Ride();
  isChatOpen = true;
  chat: Chat = new Chat();
  message: Message = new Message();
  messageText = '';
  user: User = new User();

  getReqList() {
    this.service.getReqListForHistory(this.userId).subscribe((res) => {
      if (res) {
        this.reqList = res.reverse();
      }
    });
  }
  unSend(i: any) {
    this.service.deleteReq(i).subscribe((res) => {
      if (res) {
        alert('Request unsend.');
        this.getReqList();
      }
    });
  }

  getUser() {
    this.service.getUser(this.userId).subscribe((res) => {
      if (res) {
        this.user = res;
      }
    });
  }

  markasCompleted(i: any, d: Request) {
    d.completed = true;
    d.chatCreate = false;
    this.service.editReq(i, d).subscribe((res) => {
      if (res) {
        debugger;
        this.service.deleteChat(i).subscribe((Res) => {
          if (Res) {
            debugger;
            alert('This request marked as completed.');
            this.service.getRide(d.ride.id).subscribe((result) => {
              debugger;
              if (result) {
                this.ride = result;
                for (let index = 0; index < this.ride.request.length; index++) {
                  debugger;
                  if (this.ride.request[index].reqId == i) {
                    this.ride.request[index].markedAsC = true;
                    this.ride.availabelSeat = this.ride.availabelSeat + d.seat;
                    this.ride.bookedSeat = this.ride.bookedSeat - d.seat;
                    this.service
                      .editRide(this.ride.id, this.ride)
                      .subscribe((Result) => {
                        if (Result) {
                          clearInterval(this.closeInterval);
                        }
                      });
                  }
                }
              }
            });
            this.chat = new Chat();
          }
        });
      }
    });
  }

  deleteReq(id: any) {
    this.service.deleteReq(id).subscribe((res) => {
      if (res) {
        alert('Request deleted.');
        this.getReqList();
      }
    });
  }

  crateChat(i: Request) {
    let isChat = confirm('Are you sure?');
    if (isChat) {
      clearInterval(this.closeInterval);
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
    clearInterval(this.closeInterval);
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
          window.scrollTo(0, document.body.scrollHeight);
        }
      });
    }, 100);
  }

  closeChat() {
    // this.isChatOpen = false;
    this.chat = new Chat();
  }
}
