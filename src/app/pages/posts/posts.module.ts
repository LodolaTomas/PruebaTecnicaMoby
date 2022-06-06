import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

import { RouterModule } from '@angular/router'; 

import {TableModule} from 'primeng/table';
import {DividerModule} from 'primeng/divider';
import {PanelModule} from 'primeng/panel';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToolbarModule} from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    DividerModule,
    PanelModule,
    InputTextareaModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService]
})
export class PostsModule { }
