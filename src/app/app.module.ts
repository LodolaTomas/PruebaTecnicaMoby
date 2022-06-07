import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { PostsModule } from './pages/posts/posts.module';
import { SharedModule } from './shared/shared.module';

import { PostsService } from './services/posts.service';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { AuthModule } from './auth/auth.module';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PostsModule,
    SharedModule,
    AuthModule
  ],
  providers: [PostsService,StorageService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
