import { Component, Input } from '@angular/core';
import { StarService } from 'src/app/services/star/star.service'
import { Card } from 'src/app/models/card.model';
import { tooltipMessage, ToasterMessage } from 'src/app/enums/favorites.enum';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie: Card = {
    id: 0,
    title: '',
    vote_average: 0,
    poster_path: ''
  };
  @Input() param: string = '';

  constructor(
    public starService: StarService) {
  }

  hasMoreData: boolean = true;
  currentPage: number = 0;

  scrollDistance: number = 2;
  scrollUpDistance: number = 2;
  key: string = 'favoritesMovies';
  tooltipText: string = tooltipMessage.Add;

  saveToFavorites(data: Card) {
    if (this.movie) {
      let storedData: Card[] = JSON.parse(localStorage.getItem(this.key) || '[]');

      if (!storedData.some((item) => item.id === this.movie!.id)) {
        storedData.push(this.movie);
        localStorage.setItem(this.key, JSON.stringify(storedData));
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000,
          title: this.movie.title,
          text: ToasterMessage.Add,
          icon: 'success',
        });
      } else {
        storedData = storedData.filter((item) => item.id !== this.movie!.id);
        localStorage.setItem(this.key, JSON.stringify(storedData));
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000,
          title: this.movie.title,
          text: ToasterMessage.Remove,
          icon: 'info',
        });
      }
    }
  }

  isInFavorites(data: Card): boolean {
    if (this.movie) {
      let storedData: Card[] = JSON.parse(localStorage.getItem(this.key) || '[]');
      if (storedData.some((item) => item.id === this.movie!.id)) {
        this.tooltipText = tooltipMessage.Add;
        return true;
      } else {
        this.tooltipText = tooltipMessage.Remove;
        return false;
      }
    }
    return false;
  }
}
