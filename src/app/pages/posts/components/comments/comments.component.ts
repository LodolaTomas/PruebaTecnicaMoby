import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Comment } from 'src/app/models/interface/comment.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Output() lastComment:EventEmitter<Date> = new EventEmitter();

  comments:Comment[] = [
    {
      id:1,
      email: 'jramonda@mobydigital.com',
      name: 'Juan Ramonda',
      comment:
        'quo vero reiciendis velit similique earum\nquisquam dolores velit et non\naliquid qui nesciunt est\net iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
      date: new Date(),
    },
    {
      id:2,
      email: 'afranco@mobydigital.com',
      name: 'Antonio Franco',
      comment:
        'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
      date: new Date(),
    },
  ];
  isTextAreaDisabled: boolean = true;
  constructor(private confirmationService: ConfirmationService,) { }

  ngOnInit(): void {
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
