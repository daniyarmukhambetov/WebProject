import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewPostComponent} from "./new-post/new-post.component";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {PostDetailComponent} from "./post-detail/post-detail.component";
import {MyPostsComponent} from "./my-posts/my-posts.component";
import {PostUpdateComponent} from "./post-update/post-update.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'post/:id', component:PostDetailComponent},
  {path: 'newPost', component:NewPostComponent},
  {path: 'myPosts', component: MyPostsComponent},
  // {path: 'myPosts/update/:id', component: PostUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
