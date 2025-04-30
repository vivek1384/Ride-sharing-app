import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RequestComponent } from './request/request.component';
import { CompleteComponent } from './complete/complete.component';
import { RidesComponent } from './rides/rides.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'request',
    component: RequestComponent,
  },
  {
    path: 'complition',
    component: CompleteComponent,
  },
  {
    path: 'rides',
    component: RidesComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
];
