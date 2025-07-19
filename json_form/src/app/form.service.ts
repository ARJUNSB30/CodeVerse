import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getFormData(formType: string): Observable<any> {
    return this.http.get(`/${formType}.json`)

  }
  submitFormData(formType: string, formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/${formType}`, formData);
  }
}



