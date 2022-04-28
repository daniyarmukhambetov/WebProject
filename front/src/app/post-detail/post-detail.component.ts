import { Component, OnInit } from '@angular/core';
import {HelpService} from "../help.service";
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {Post} from "../new-post/Post";
import {GetPost} from "../new-post/getPost";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  id: number = 0;
  post!: GetPost
  constructor(private service: HelpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getId()
    this.getPost(this.id)
  }
  getId() {
    this.route.paramMap.subscribe(
      params => {
        this.id = +params.get('id')!
      }
    )
  }
  getPost(id: number) {
    this.service.getPost(id).subscribe(
      post => {
        this.post = post;
      }
    )
  }
}
