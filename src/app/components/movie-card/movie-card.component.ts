import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgStyle, DatePipe } from '@angular/common';
import { TruncateTextPipe } from '../../pipes/truncate-text.pipe';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.css'],
    standalone: true,
    imports: [NgStyle, DatePipe, TruncateTextPipe]
})
export class MovieCardComponent {

  // tslint:disable-next-line: no-input-rename
  @Input('movieObject') movie: any;

  // backgroundUrl: string;
  p: number = 1;

  constructor( private router: Router ) {}

  goMovie( movie: any ) {
    let movieId: string;
    movieId = movie.id;
    this.router.navigate(['/movie', movieId]);
  }

}
