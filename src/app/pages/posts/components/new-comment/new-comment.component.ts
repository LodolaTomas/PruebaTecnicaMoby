import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from 'src/app/models/interface/comment.interface';
import { User } from 'src/app/models/interface/user.interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
})
export class NewCommentComponent implements OnInit {
  @Input() title!: string;
  @Input() postId!: number;
  @Input() commentId!: number;
  isTextAreaDisabled: boolean = false;
  editComment!:Comment|null;
  titleSubmit='send comment';
  private isEmail = /\S+@\S+\.\S+/;
  public commentForm: FormGroup;
  formSubmitted = false;
  constructor(private fb: FormBuilder, private storageSrv: StorageService) {
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      comment: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const user = this.validateUser();
    if (user) {
      if(this.commentId){
        this.editComment = this.storageSrv.getCommentByPostId(this.postId,this.commentId);
        this.editComment ? this.titleSubmit='edit comment' : this.titleSubmit='send comment';
      }
      this.setUserForm(user);
    }
  }

  formNotValid(camp: string): boolean {
    return this.commentForm.get(camp)!.invalid && this.formSubmitted;
  }

  submitComment() {
    this.formSubmitted = true;
    if (this.commentForm.valid) {
      const id = this.editComment?this.commentId:this.getMaxId();
      const comment: Comment = {
        id: id,
        email: this.commentForm.controls['email'].value,
        name: this.commentForm.controls['name'].value,
        comment: this.commentForm.value.comment,
        date: new Date().toString(),
      };
      this.storageSrv.setCommentInPost(this.postId, comment);
      if(this.validateUser()){
        this.commentForm.controls['comment'].reset();
        this.formSubmitted = false;
      }else{
        this.commentForm.reset();
        this.formSubmitted = false;
      }
    }
  }

  getMaxId(): number {
    const comments = this.storageSrv.getPostCommentsByPostId(
      this.postId
    )?.comments;
    if (comments) {
      const ids = comments.map((comment) => comment.id);
      const maxId = Math.max(...ids);
      return maxId + 1;
    }
    return 0;
  }

  validateUser(): User | null {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null;
  }

  setUserForm(user: User) {
    this.commentForm.patchValue({
      name: user.name,
      email: user.email,
      comment: this.editComment ? this.editComment.comment:'',
    });
    this.commentForm.controls['name'].disable();
    this.commentForm.controls['email'].disable();
  }
}
