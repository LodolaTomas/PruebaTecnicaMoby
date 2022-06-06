import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PostsRoutingModule } from './pages/posts/posts-routing.module';

const routes: Routes = [
  {
    path: '', redirectTo: 'posts', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '404', component: PageNotFoundComponent
  },
  {
    path: '**', redirectTo: '404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),PostsRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
