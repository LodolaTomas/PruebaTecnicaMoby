import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Comment } from 'src/app/models/interface/comment.interface';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Output() lastComment:EventEmitter<string> = new EventEmitter();
  @Input() postId!:number;
  comments!:Comment[];
  isTextAreaDisabled: boolean = true;
  constructor(private confirmationService: ConfirmationService,private storageSrv:StorageService) { }

  ngOnInit(): void {
    this.storageSrv.subscriptionPostComments.subscribe({
      next: (comentInPosts) => {
        this.comments = comentInPosts.map(comentInPost => comentInPost.postId === this.postId ? comentInPost.comments : []).flat();
      }
    })
    this.comments = this.storageSrv.getPostCommentsByPostId(this.postId)?.comments ? this.storageSrv.getPostCommentsByPostId(this.postId)?.comments! : [];
  }

  deleteComment(id:number):void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this comment?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.comments = this.comments.filter(
          (comment) => comment.id != id
        );
      },
    });
  }

  emitLastComment(){
    this.lastComment.emit(this.comments[this.comments.length-1].date);
  }

}
