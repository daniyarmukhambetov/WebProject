import { Component, OnInit } from '@angular/core';
import {NewPostService} from "../new-post.service";
import {HelpService} from "../help.service";
import {GetPost} from "../new-post/getPost";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  posts: GetPost[] = []
  constructor(private service1: NewPostService, private service2: HelpService) { }

  ngOnInit(): void {
  }

}
