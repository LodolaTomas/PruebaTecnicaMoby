import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  post = {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  };
  comments = [
    {
      email: 'jramonda@mobydigital.com',
      name: 'Juan Ramonda',
      comment:
        'quo vero reiciendis velit similique earum\nquisquam dolores velit et non\naliquid qui nesciunt est\net iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
    },
    {
      email: 'afranco@mobydigital.com',
      name: 'Antonio Franco',
      comment:
        'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
    },
  ];
  isTextAreaDisabled: boolean = true;
  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {}

  deleteComment(email: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this comment?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.comments = this.comments.filter(
          (comment) => comment.email != email
        );
      },
    });
  }
}
