import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../app.component';
import { ServiceService } from '../service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    this.userId = localStorage.getItem('userid');
    this.getUser();
  }

  icon = faBars;
  icon2 = faXmark;

  router = inject(Router);
  servie = inject(ServiceService);
  user: User = new User();

  userName: string = '';

  userId: any = undefined;

  getUser() {
    this.servie.getUser(this.userId).subscribe((res) => {
      if (res) {
        this.user = res;
      }
    });
  }

  logout() {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      localStorage.removeItem('userid');
      this.router.navigate(['login']);
      this.user = new User();
    }
  }

  ismenu = false;
  openMenu() {
    this.ismenu = !this.ismenu;
  }
}
