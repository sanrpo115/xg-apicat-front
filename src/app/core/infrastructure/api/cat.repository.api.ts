import { Observable } from "rxjs";
import { ApiService } from "../../data/api.service";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CatRepositoryApi {
  private readonly apiService = inject(ApiService);

  get(path: string): Observable<any[]> {
    return this.apiService.get(path);
  }
  
}