import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PostdetailComponent } from './pages/postdetail/postdetail.component';
import { PostlistComponent } from './pages/postlist/postlist.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/posts', pathMatch: 'full'
  },
  {
    path: 'posts', component: PostlistComponent
  },
  {
    path: 'posts/:id', component: PostdetailComponent
  },
  {
    path: '/login', component: LoginComponent
  },
  {
    path: '/404', component: PageNotFoundComponent
  },
  {
    path: '**', redirectTo: '/404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
