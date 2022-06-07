import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Comment } from 'src/app/models/interface/comment.interface';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {

  @Input() postId!:number;

  isTextAreaDisabled:boolean = false;

  private isEmail = /\S+@\S+\.\S+/;
  public commentForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
    comment: ['', [Validators.required, Validators.maxLength(500)]],
  });
  formSubmitted = false;
  constructor(private fb:FormBuilder,private storageSrv:StorageService) { }

  ngOnInit(): void {
  }

  formNotValid(camp: string): boolean {
    return this.commentForm.get(camp)!.invalid && this.formSubmitted;
  }

  submitComment(){
    this.formSubmitted = true;
    if(this.commentForm.valid){
      const id = this.getMaxId()
      const comment:Comment = {
        id:id,
        email: this.commentForm.value.email,
        name: this.commentForm.value.name,
        comment: this.commentForm.value.comment,
        date: new Date().toString(),
      }
      this.storageSrv.setCommentInPost(this.postId, comment);
    }
  }

  getMaxId():number{
    const comments = this.storageSrv.getPostCommentsByPostId(this.postId)?.comments;
    if(comments){
      const ids = comments.map(comment =>  comment.id);
      const maxId = Math.max(...ids);
      return maxId + 1;
    }
    return 0;
  }

}
