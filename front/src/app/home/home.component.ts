import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // window.location.reload()
    let logBtn = document.getElementById('login-btn')!
    if (localStorage.getItem('token') === null) {
      logBtn.innerHTML = 'Войти'
    } else {
      logBtn.innerHTML = 'Выйти'
    }
  }
  logInOut(): void {
    let logBtn = document.getElementById('login-btn')!
    if (logBtn.innerHTML === 'Войти') {
      this.router.navigate(['/login'], {relativeTo: this.route})
    } else {
      localStorage.clear()
      logBtn.innerHTML = 'Войти'
    }
  }

}
