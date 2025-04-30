import { Component, inject, OnInit } from '@angular/core';
import { AcceptedRequest, Request, Ride, User } from '../app.component';
import { ServiceService } from '../service.service';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-rides',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './rides.component.html',
  styleUrl: './rides.component.css',
})
export class RidesComponent implements OnInit {
  ngOnInit(): void {
    this.userID = localStorage.getItem('userid');
    this.getRidelist();
  }

  service = inject(ServiceService);
  rideList: Ride[] = [];
  requestList: AcceptedRequest[] = [];
  request: Request = new Request();
  ride: Ride = new Ride();
  user: User = new User();
  userID: any;
  isOpen = false;

  getRidelist() {
    this.service.getRideListbyId(this.userID).subscribe((res) => {
      if (res) {
        this.rideList = res.reverse();
        console.log(this.rideList);
      }
    });
  }

  onClick(i: Ride) {
    this.isOpen = true;
    this.ride = i;
    this.requestList = i.request;
  }
  onClose() {
    this.isOpen = false;
    this.requestList = [];
    this.ride = new Ride();
  }

  requestDecline(index: number, i: any) {
    this.ride.request.splice(index, 1);
    debugger;
    this.service.getReq(i).subscribe((res) => {
      debugger;
      if (res) {
        this.request = res;
        debugger;
        this.request.accepted = 'Declined';
        this.service.editReq(this.request.id, this.request).subscribe((Res) => {
          debugger;
          if (Res) {
            this.ride.bookedSeat = this.ride.bookedSeat - this.request.seat;
            this.ride.availabelSeat =
              this.ride.availabelSeat + this.request.seat;
            this.service
              .editRide(this.ride.id, this.ride)
              .subscribe((result) => {
                debugger;
                if (result) {
                  alert('Request Declined.');
                  this.isOpen = false;
                }
              });
          }
        });
      }
    });
  }
}
