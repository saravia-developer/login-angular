import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private headers = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) { }

  readFile(body: any) {

    return this.http.post(`${BASE_URL}/file/file-read/`, body, { headers: this.headers })
  }
}
