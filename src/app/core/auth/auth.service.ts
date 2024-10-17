import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const BASE_URL = "http://localhost:3000/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient,
  ) {}

  login(body: any) {
    return this.http.post<any>(`${BASE_URL}/login`, body, { headers: this.headers })
  }

  register(body: any) {
    return this.http.post<any>(`${BASE_URL}/register`, body, { headers: this.headers })
  }
}
