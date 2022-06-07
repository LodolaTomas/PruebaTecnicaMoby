import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comment } from '../models/interface/comment.interface';
import { CommentsInPost } from '../models/interface/commentsInPost.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  key: string = 'postsComment';
  public postsComments: CommentsInPost[] = [];
  subscriptionPostComments: Subject<CommentsInPost[]>;
  constructor() {
    this.postsComments = this.PostComments || [];
    this.subscriptionPostComments = new Subject<CommentsInPost[]>();
  }

  setItem(value: CommentsInPost[]) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  setCommentInPost(postId: number, comment: Comment) {
    const postComments = this.getPostCommentsByPostId(postId);
    if (postComments) {
      postComments.comments.push(comment);
      this.postsComments.forEach((postComment) => {
        if (postComment.postId === postId) {
          postComment.comments.push(comment);
        }
      });
      this.setItem(this.postsComments);
      this.subscriptionPostComments.next(this.postsComments);
    } else {
      this.postsComments.push({ postId, comments: [comment] });
      this.setItem(this.postsComments);
      this.subscriptionPostComments.next(this.postsComments);
    }
  }

  get PostComments(): CommentsInPost[] | null {
    return JSON.parse(localStorage.getItem(this.key)!);
  }

  getPostCommentsByPostId(postId: number): CommentsInPost | null {
    const postComments = this.PostComments;
    if (postComments) {
      return postComments.find((postComment) => postComment.postId === postId)!;
    }
    return null;
  }
}
