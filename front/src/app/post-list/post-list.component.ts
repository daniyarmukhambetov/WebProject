import { Component, OnInit } from '@angular/core';
import {HelpService} from "../help.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Post} from "../new-post/Post";
import {GetPost} from "../new-post/getPost";
import {NewPostService} from "../new-post.service";
import {Mark} from "../new-post/Mark";
import {Model} from "../new-post/Model";
import {Car} from "../new-post/Car";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: GetPost[] = [];
  marks: Mark[] = [];
  models: Model[] = [];
  cars: Car[] = [];
  mark_id: number = 0;
  model_id: number = 0;
  car_year: number = 0;
  car_id: number = 0;
  filtered_posts: GetPost[] = [];
  constructor(private service: NewPostService, private service2: HelpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getPosts();
    // this.getMarks();
  }
  getPosts() {
    this.service2.getPosts().subscribe(
      posts => {
        this.posts = posts
      }
    )
  }
}
