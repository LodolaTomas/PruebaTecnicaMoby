import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExitGuard } from 'src/app/guards/exit.guard';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

const postsRoutes: Routes = [
  {
    path: 'posts',
    component: ListComponent,
  },
  {
    path: 'posts/:id',
    canDeactivate: [ExitGuard],
    component: DetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(postsRoutes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
