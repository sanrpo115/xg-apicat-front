import { Observable } from "rxjs";
import { ApiService } from "../../data/api.service";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoginRepositoryApi {
  private readonly apiService = inject(ApiService);

  get(path: string): Observable<any[]> {
    return this.apiService.get(path);
  }

  post(path: string, data: any): Observable<any> {
    return this.apiService.post(path, data);
  }
  
}