import { Component, inject } from '@angular/core';
import { User } from '../app.component';
import { ServiceService } from '../service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  service = inject(ServiceService);
  router = inject(Router);

  user: User = new User();

  SignUp() {
    if (this.user.email && this.user.name && this.user.password) {
      this.service.addUser(this.user).subscribe((res) => {
        // debugger
        if (res) {
          alert('SignUp Success.');
          this.login()
        }
      });
    } else {
      alert('Something is missing.');
    }
  }

  isLogin = true;

  onClick() {
    this.isLogin = !this.isLogin;
  }

  login() {
    if (this.user.email && this.user.password) {
      this.service
        .getUserbyPass(this.user.email, this.user.password)
        .subscribe((res) => {
          // debugger 
          if (res.length == 1) {
            alert('Login success.');
            localStorage.setItem('userid', res[0].id);
            this.router.navigate(['home']);
          } else {
            alert('Email or Password is incorrect.');
          }
        });
    } else {
      alert('Something is missing.');
    }
  }
}
