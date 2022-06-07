import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

import { RouterModule } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
import {InputTextModule} from 'primeng/inputtext';
import { PostsService } from 'src/app/service/posts.service';
import { CommentsComponent } from './components/comments/comments.component';
@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    CommentsComponent
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
    InputTextModule
  ],
  providers: [ConfirmationService,PostsService]
})
export class PostsModule { }
