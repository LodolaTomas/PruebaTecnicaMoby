import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Comment } from 'src/app/models/interface/comment.interface';
import { UserType } from 'src/app/models/types/user.type';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Output() lastComment: EventEmitter<string> = new EventEmitter();
  @Input() postId: number=-1;
  comments!: Comment[];
  isTextAreaDisabled: boolean = true;
  user: UserType;
  isLogged: boolean = false;
  closeResult: string = '';
  selectedComment!:number;
  constructor(
    private confirmationService: ConfirmationService,
    private storageSrv: StorageService,
    private authSrv: AuthService,
    private modalService: NgbModal
  ) {
    this.user = this.authSrv.user ? this.authSrv.user : null;
    this.isLogged = this.user ? true : false;
  }

  ngOnInit(): void {
    this.storageSrv.subscriptionPostComments.subscribe({
      next: (comentInPosts) => {
        this.comments = comentInPosts
          .map((comentInPost) =>
            comentInPost.postId === this.postId ? comentInPost.comments : []
          )
          .flat();
      },
    });
    this.comments = this.storageSrv.getPostCommentsByPostId(this.postId)
      ?.comments
      ? this.storageSrv.getPostCommentsByPostId(this.postId)?.comments!
      : [];
  }

  deleteComment(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this comment?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.comments = this.comments.filter((comment) => comment.id != id);
        this.storageSrv.deleteCommentInPost(this.postId, id);
      },
    });
  }

  emitLastComment() {
    this.lastComment.emit(this.comments[this.comments.length - 1].date);
  }

  editMyComments(commentId:number, content: any) {
    this.selectedComment = commentId;
    this.open(content);
  }

  deleteMyComment(id: number) {
    this.deleteComment(id);
  }

  isMyComment(userEmail: string): boolean {
    return this.user!.email === userEmail;
  }

  open(content:any) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    },
    () => {/* sino pongo el onrejected tira error en la consola */
      console.log('dismissed');
    });
  }

}
