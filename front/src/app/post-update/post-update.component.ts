import { Component, OnInit } from '@angular/core';
import {HelpService} from "../help.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {

  constructor(private service: HelpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

}
