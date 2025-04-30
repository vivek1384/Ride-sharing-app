import { Component, inject, OnInit } from '@angular/core';
import { Request, Ride, User } from '../app.component';
import { ServiceService } from '../service.service';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-home',
  imports: [FormsModule, NgStyle, FontAwesomeModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  service = inject(ServiceService);

  ngOnInit(): void {
    this.userId = localStorage.getItem('userid');
    this.getuser();
    this.getRidelist();
  }

  icon1 = faRightLong;

  user: User = new User();
  rideList: Ride[] = [];
  searchList: Ride[] = [];
  ride: Ride = new Ride();
  request: Request = new Request();
  req: Request = new Request();
  userId: any = undefined;

  searchButton() {
    this.searchList = [];
    this.getRidelist();
    for (let index = 0; index < this.rideList.length; index++) {
      if (
        this.rideList[index].start
          .toLowerCase()
          .includes(this.startText.toLowerCase()) &&
        this.rideList[index].availabelSeat >= this.requireSeat
      ) {
        debugger;
        if (
          this.rideList[index].via1
            .toLowerCase()
            .includes(this.endText.toLowerCase()) ||
          this.rideList[index].via2
            .toLowerCase()
            .includes(this.endText.toLowerCase()) ||
          this.rideList[index].via3
            .toLowerCase()
            .includes(this.endText.toLowerCase()) ||
          this.rideList[index].end
            .toLowerCase()
            .includes(this.endText.toLowerCase())
        ) {
          this.searchList.push(this.rideList[index]);
        }
      } else if (
        this.rideList[index].via1
          .toLowerCase()
          .includes(this.startText.toLowerCase()) &&
        this.rideList[index].availabelSeat >= this.requireSeat
      ) {
        debugger;
        if (
          this.rideList[index].via2
            .toLowerCase()
            .includes(this.endText.toLowerCase()) ||
          this.rideList[index].via3
            .toLowerCase()
            .includes(this.endText.toLowerCase()) ||
          this.rideList[index].end
            .toLowerCase()
            .includes(this.endText.toLowerCase())
        ) {
          this.searchList.push(this.rideList[index]);
        }
      } else if (
        this.rideList[index].via2
          .toLowerCase()
          .includes(this.startText.toLowerCase()) &&
        this.rideList[index].availabelSeat >= this.requireSeat
      ) {
        debugger;
        if (
          this.rideList[index].via3
            .toLowerCase()
            .includes(this.endText.toLowerCase()) ||
          this.rideList[index].end
            .toLowerCase()
            .includes(this.endText.toLowerCase())
        ) {
          this.searchList.push(this.rideList[index]);
        }
      } else if (
        this.rideList[index].via3
          .toLowerCase()
          .includes(this.startText.toLowerCase()) &&
        this.rideList[index].availabelSeat >= this.requireSeat
      ) {
        debugger;
        if (
          this.rideList[index].end
            .toLowerCase()
            .includes(this.endText.toLowerCase())
        ) {
          this.searchList.push(this.rideList[index]);
        }
      }
    }
    console.log(this.searchList);
  }

  getuser() {
    this.service.getUser(this.userId).subscribe((res) => {
      if (res) {
        this.user = res;
      }
    });
  }

  startText: string = '';
  endText: string = '';
  requireSeat: number = 0;

  getRidelist() {
    this.service.getRidelist().subscribe((res) => {
      if (res) {
        this.rideList = res;
      }
    });
  }

  addRide() {
    if (this.ride.start && this.ride.end) {
      this.ride.userId = this.userId;
      this.ride.userName = this.user.name;
      if (!this.ride.via1) {
        this.ride.via1 = 'NA';
      } else if (!this.ride.via2) {
        this.ride.via2 = 'NA';
      } else if (!this.ride.via3) {
        this.ride.via3 = 'NA';
      }
      this.ride.availabelSeat = this.ride.seat;
      this.service.addRide(this.ride).subscribe((res) => {
        if (res) {
          alert('Ride added.');
          this.getRidelist();
          this.ride = new Ride();
        }
      });
    } else if (!this.ride.start) {
      alert('Start destination is missing.');
    } else if (!this.ride.end) {
      alert('End destination is missing.');
    }
  }

  onRideClick(d: Ride) {
    let isConfirm = confirm('Sure to send ride request?');
    if (isConfirm) {
      if (this.userId == d.userId) {
        alert("You can't book your own ride.");
      } else {
        this.request.requestId = this.userId;
        this.request.requestName = this.user.name;
        this.request.ride = d;
        this.request.start = this.startText;
        this.request.end = this.endText;
        this.request.seat = this.requireSeat;
        this.service.addReq(this.request).subscribe((res) => {
          if (res) {
            alert(`Request sent to ${d.userName}.`);
          }
        });
      }
    }
  }
}
