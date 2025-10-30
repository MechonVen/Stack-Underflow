import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Scholarships } from './pages/scholarships/scholarships';
import { Membership } from './pages/membership/membership';
import { Store } from './pages/store/store';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'scholarships', component: Scholarships },
  { path: 'membership', component: Membership },
  { path: 'store', component: Store },
  { path: '**', component: NotFound },
];
