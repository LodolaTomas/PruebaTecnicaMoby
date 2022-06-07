import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from 'src/app/models/interface/post.interface';
import { PostsService } from 'src/app/services/posts.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit{
  post!: Post;
  dateLastComment!:string;
  idPost!:number;
  constructor(private postSrv: PostsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idPost = params['id'];
      this.postSrv.getPost(this.idPost).subscribe((data) => {
        this.post = data;
      });
    });
  }

  getLastComment(lastComment:string):void{
    let date = new Date(lastComment);
    let year = date.getUTCFullYear()
    let month = date.toLocaleString('en', { month: 'long' })
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    this.dateLastComment = `${year}, ${month}, ${day}, ${hour}:${minute}`
  }
}
