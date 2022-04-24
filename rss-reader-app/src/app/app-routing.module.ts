import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedsComponent } from './feeds/feeds.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedsDetailComponent } from './feeds-detail/feeds-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'feeds', component: FeedsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: FeedsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
