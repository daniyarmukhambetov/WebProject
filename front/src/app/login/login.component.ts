import { Component, OnInit } from '@angular/core';
import {HelpService} from "../help.service";
import { LogData} from "./logData";
import  { Token } from "./Token"
import {NewPostService} from "../new-post.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  num: String = ""
  password: String = ""
  token: string = ""
  constructor(private service: HelpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  logIn() {
    let logData: LogData = {
      number: this.num,
      password:this.password
    }
    let token!: Token;
    this.service.login(logData).subscribe(
      tok => {
        this.token = tok.token
        localStorage.setItem('token', this.token)
      }
    )
    // console.log(localStorage.getItem('token'))
    this.router.navigate(['/'], {relativeTo: this.route});
  }

}
