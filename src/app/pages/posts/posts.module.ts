import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PostsService } from 'src/app/service/posts.service';
import { CommentsComponent } from './components/comments/comments.component';
import { NewCommentComponent } from './components/new-comment/new-comment.component';

import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {DividerModule} from 'primeng/divider';
import {PanelModule} from 'primeng/panel';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToolbarModule} from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import {FieldsetModule} from 'primeng/fieldset';
import {ToastModule} from 'primeng/toast';
@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    CommentsComponent,
    NewCommentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    DividerModule,
    PanelModule,
    InputTextareaModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    ConfirmDialogModule,
    FieldsetModule,
    InputTextModule,
    ToastModule
  ],
  providers: [ConfirmationService,PostsService]
})
export class PostsModule { }
