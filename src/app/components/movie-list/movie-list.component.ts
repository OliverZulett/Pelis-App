import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgFor, NgStyle } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css'],
    imports: [NgIf, NgFor, NgStyle, NgxPaginationModule]
})
export class MovieListComponent {

  // tslint:disable-next-line: no-input-rename
  @Input('moviesObject') movies: any[] = [];
  @Input() pagination: boolean = false;
  @Input() resultsPerPage: number =  9;

  @Output() goHomeResponse = new EventEmitter<boolean>();

  p: number = 1;

  constructor( private router: Router ) { }

  goMovie( movie: any ) {
    this.goHomeResponse.emit(true);
    let movieId: string;
    movieId = movie.id;
    this.router.navigate(['/movie', movieId]);
  }
}
