import { HttpClient } from "@angular/common/http";
import { enviroment } from "../../../enviroments/enviroment";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlBase: string = `${enviroment.urlBase}`;

  constructor(private http: HttpClient) { }

  get(endpoint: string): Observable<any> {
    const url = `${this.urlBase}/${endpoint}`;
    return this.http.get<any>(url);
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.urlBase}/${endpoint}`, data);
  }

}
