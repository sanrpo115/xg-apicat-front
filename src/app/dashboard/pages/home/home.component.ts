import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CatService } from '../../../shared/services/cat.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './home.component.html'
})
export default class HomeComponent {
  private catService: CatService = inject(CatService);
  private readonly authService: AuthService = inject(AuthService);
  breedsData: Array<any> = [];
  breedSelected: boolean = false;

  ngOnInit() {
    console.log(this.authService.isAuthenticated());
    this.getBreeds();
  }

  async getBreeds(): Promise<void> {
    try {
      const response = await this.catService.getBreeds(); 
      if (response.length > 1) {
        this.breedsData = response;
      }
    } catch (error: any) {
      console.log('Error Login: ', error.error.error)
      // this.handleModal({ message: error.error.error, type: 'Error', title: 'Ups!', navigate: false});
    }
  }

  async onChangeList(event: any) {
    try {
      console.log('onChangeList', event.target.value);
      const breedId = event.target.value;
      const response = await this.catService.getBreedById(breedId);
      console.log(response); 
      if (response) {
        this.breedSelected = true;
        this.catService.updateBreedData(response);
      }
    } catch (error: any) {
      console.log('Error Login: ', error.error.error)
      // this.handleModal({ message: error.error.error, type: 'Error', title: 'Ups!', navigate: false});
    }
  }
}
