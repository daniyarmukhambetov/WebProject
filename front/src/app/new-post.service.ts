import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {Mark} from "./new-post/Mark";
import {Model} from "./new-post/Model";
import {Year} from "./new-post/Year";
import {Car} from "./new-post/Car";
import {Post} from "./new-post/Post";
import {GetPost} from "./new-post/getPost";
@Injectable({
  providedIn: 'root'
})
export class NewPostService {
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders({
    'content-type':'application/json',
    'Authorization':`Bearer ${this.token}`,
    "Access-Control-Allow-Origin": '*'
  })
  ROOT = "http://127.0.0.1:8000"
  constructor(
    private http: HttpClient
  ) { }
  getMarks(): Observable<Mark[]> {
    return this.http.get<Mark[]>(`${this.ROOT}/api/marks`, {
      headers: new HttpHeaders({
        'content-type':'application/json',
        'Authorization':`Bearer ${this.token}`,
        "Access-Control-Allow-Origin": '*'
      })
    })
    // console.log("Succes");
  }
  getModels(mark_id:number): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.ROOT}/api/models?mark=${mark_id}`,
    {
      headers: new HttpHeaders({
        'content-type':'application/json',
        'Authorization':`Bearer ${this.token}`,
        "Access-Control-Allow-Origin": '*'
      })
    }
    );
  }
  getYears(model_id:number): Observable<Year[]> {
    return this.http.get<Year[]>(`${this.ROOT}/api/years?model=${model_id}`,
      {
        headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization':`Bearer ${this.token}`,
          "Access-Control-Allow-Origin": '*'
        })
      }
    );
  }
  getCars(model_id: String, year: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.ROOT}/api/cars?model=${model_id}&year=${year}`,
      {
        headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization':`Bearer ${this.token}`,
          "Access-Control-Allow-Origin": '*'
        })
      }
    )
  }
  getCars2(model_id: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.ROOT}/api/cars?model=${model_id}`,
      {
        headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization':`Bearer ${this.token}`,
          "Access-Control-Allow-Origin": '*'
        })
      }
    )
  }
  getPosts2(car_id: number): Observable<GetPost[]> {
    return this.http.get<GetPost[]>(`${this.ROOT}/api/posts?car_id=${car_id}`,
      {
        headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization':`Bearer ${this.token}`,
          "Access-Control-Allow-Origin": '*'
        })
      }
    )
  }
  postPost(newPost: Post): Observable<Post> {
    return this.http.post<Post>(`${this.ROOT}/api/posts/`, newPost, {
      headers: new HttpHeaders({
        'content-type':'application/json',
        'Authorization':`Bearer ${this.token}`,
        "Access-Control-Allow-Origin": '*'
      })
    });
  }
}
