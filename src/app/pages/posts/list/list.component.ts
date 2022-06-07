import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Post } from 'src/app/models/interface/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postSrv: PostsService) {}

  ngOnInit(): void {
    this.postSrv
      .getPosts()
      .pipe(map((posts) => posts.slice(0, 10)))
      .subscribe((data) => {
        this.posts.push(...data);
      });
  }
}
