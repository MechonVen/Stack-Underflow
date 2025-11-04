import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Service } from './pages/service/service';
import { Advocacy } from './pages/advocacy/advocacy';
import { Scholarships } from './pages/scholarships/scholarships';
import { Membership } from './pages/membership/membership';
import { ZontaInAction } from './pages/zonta-in-action/zonta-in-action';
import { Store } from './pages/store/store';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'service', component: Service },
  { path: 'advocacy', component: Advocacy },
  { path: 'scholarships', component: Scholarships },
  { path: 'membership', component: Membership },
  { path: 'zonta-in-action', component: ZontaInAction },
  { path: 'store', component: Store },
  { path: '**', component: NotFound },
];
