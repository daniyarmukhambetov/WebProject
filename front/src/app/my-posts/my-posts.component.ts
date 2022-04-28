import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HelpService} from "../help.service";
import {GetPost} from "../new-post/getPost";

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  posts: GetPost[] = []
  constructor(private service: HelpService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.getPost();
  }
  getPost(): void {
    this.service.getUserPosts().subscribe(
      posts => {
        this.posts = posts
      }
    )
  }
  deletePost(post: GetPost) {
    // console.log(post)
    this.service.deletePost(post).subscribe(
      delPost => {
        console.log(delPost)
      }
    );
    window.location.reload()
  }


}
