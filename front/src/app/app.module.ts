import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPostComponent } from './new-post/new-post.component';
import {HttpClientModule} from "@angular/common/http";
import { PostListComponent } from './post-list/post-list.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from "@angular/forms";
import { NewPostInfoComponent } from './new-post/new-post-info/new-post-info.component';
import { LoginComponent } from './login/login.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    PostListComponent,
    HomeComponent,
    NewPostInfoComponent,
    LoginComponent,
    PostDetailComponent,
    MyPostsComponent,
    PostUpdateComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
