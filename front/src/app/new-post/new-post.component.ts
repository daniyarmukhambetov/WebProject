import { Component, OnInit } from '@angular/core';
import { NewPostService} from "../new-post.service";
import {Mark} from "./Mark";
import {Model} from "./Model";
import {Car} from "./Car";
import {FormsModule} from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Year} from "./Year";
import {Post} from "./Post";


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  title: String = "";
  description: String = "";
  price: number = 0;
  title_sos: boolean = false;
  description_sos: boolean = false;
  price_sos: boolean = false;
  marks: Mark[] = [];
  models: Model[] = [];
  mark_id: number = 0;
  model_id: number = 0;
  car_year: number = 0;
  car_id: number = 0;
  cars: Car[] = [];
  years: Year[] = [];
  mileage: number = 0;
  color: String = "";
  city: String = "";
  stage: number = 0
  posted: boolean = false
  constructor(private service: NewPostService, private route: ActivatedRoute, private router: Router) { }
  getMarks(): void {
    this.service.getMarks().subscribe(
      marks => {
        this.marks = marks;
        // console.log(marks);
      }
    );
  }
  getModels(mark_id: number): void {
    this.service.getModels(mark_id).subscribe(
      models => {
        this.models = models;
        this.marks = []
        // console.log(models);
      }
    )
  }
  getYears(model_id: number): void {
    this.service.getYears(model_id).subscribe(
      years => {
        this.models = []
        this.years = years;
      }
    )
  }
  ngOnInit(): void {
    this.getMarks();
    console.log(localStorage)
  }
  selectMark(mark_id: number) : void {
    this.mark_id = mark_id;
    localStorage.setItem("mark_id", String(mark_id));
    console.log(localStorage)
    this.getModels(mark_id);
  }
  selectModel(model_id: number): void {
    this.model_id = model_id;
    console.log(model_id)
    localStorage.setItem('model_id', String(this.model_id));
    // console.log(localStorage.getItem('model_id'))
    this.getYears(model_id);
    console.log(localStorage)
  }
  getCars(year: number): void {
    console.log(localStorage.getItem("model_id"))
    // console.log(+!localStorage.getItem("model_id"))
    this.service.getCars(localStorage.getItem("model_id")!, year ).subscribe(
      cars => {
        this.cars = cars
        // console.log(localStorage.getItem('model_id'))
        this.years = []
      }
    )
  }
  selectYear(year: number): void {
    this.car_year = year;
    localStorage.setItem("year", String(year))
    // console.log(localStorage)
    // console.log(localStorage.getItem('model_id'), this.car_id);
    this.getCars(year);
  }
  selectCar(car_id: number): void {
    this.car_id = car_id
    // console.log(car_id)
    this.cars = []
    localStorage.setItem('car_id', String(car_id));
    console.log(localStorage)
  }
  Post(): void {
    let post: Post = {
      title:this.title,
      description:this.description,
      price:this.price,
      city:this.city,
      car:this.car_id,
      color:this.color,
      mileage:this.mileage
    };
    // console.log(post)
    this.service.postPost(post).subscribe(
      post => {
        // console.log(post)
      }
    )
    this.posted = true
    alert('Ваша публикация успешно опубликовано! Нажните ОК чтобы перейти на главную страницу!')
    this.router.navigate([''], {relativeTo: this.route});
  }
}
