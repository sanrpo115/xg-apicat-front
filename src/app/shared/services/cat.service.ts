import { Injectable } from '@angular/core';
import { CatRepositoryApi } from '../../core/infrastructure/api/cat.repository.api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private readonly path: string = 'breeds';
  private context: string = '';
  breedSource: any = new BehaviorSubject<any>({});
  breedData$: any = this.breedSource.asObservable();

  constructor(private catRepositoryApi: CatRepositoryApi) { }

  getBreeds(): Promise<any> {
    this.context = `${this.path}`;
    return new Promise((resolve, reject) => {
      this.catRepositoryApi.get(this.context).subscribe({
      next: (res: any) => {
        resolve(res);
      },
      error: (error: any) => {
        reject(error);
      }});
    });
  }

  getBreedById(id: string): Promise<any> {
    this.context = `${this.path}/${id}`;
    return new Promise((resolve, reject) => {
      this.catRepositoryApi.get(this.context).subscribe({
      next: (res: any) => {
        resolve(res);
      },
      error: (error: any) => {
        reject(error);
      }});
    });
  }

  updateBreedData(data: any) {
    this.breedSource.next(data);
  }
}
