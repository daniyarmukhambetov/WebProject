import { Injectable } from '@angular/core';
import { Post} from "./new-post/Post";
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {LogData} from './login/logData'
import {Token} from './login/Token'
import {Observable} from "rxjs";
import {GetPost} from "./new-post/getPost";
@Injectable({
  providedIn: 'root'
})
export class HelpService {
  ROOT: String = 'http://127.0.0.1:8000/api'
  token = localStorage.getItem('token')
  private headers = new HttpHeaders({
    'content-type':'application/json',
    'Authorization':`Bearer ${this.token}`,
    "Access-Control-Allow-Origin": '*'
  })
  constructor(private client: HttpClient) { }
  login(logData: LogData): Observable<Token> {
    return this.client.post<Token>(
      `${this.ROOT}/login/`, logData
    )
  }
  getPosts(): Observable<GetPost[]> {
    return this.client.get<GetPost[]>(
      `${this.ROOT}/posts`, {
        headers:this.headers
      }
    )
  }
  getUserPosts(): Observable<GetPost[]> {
    return this.client.get<GetPost[]>(
      `${this.ROOT}/myPosts`, {
        headers:this.headers
      }
    )
  }
  getPost(id: number): Observable<GetPost> {
    return this.client.get<GetPost>(
      `${this.ROOT}/posts/${id}`, {
        headers: this.headers
      }
    )
  }
  deletePost(post: GetPost): Observable<GetPost> {
    return this.client.delete<GetPost>(
      `${this.ROOT}/posts/${post.id}`, {
        headers: this.headers
      }
    )
  }
  updatePost(id: number, post: Post): void {
    this.client.put(
      `${this.ROOT}/posts/${id}`, post, {
        headers: this.headers
      }
    )
  }
 }
