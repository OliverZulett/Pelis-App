import { Component } from '@angular/core';
import { MoviesService } from 'src/app/providers/movies.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgClass, NgStyle, NgFor, CurrencyPipe, DatePipe } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: [
        './movie.component.css',
        './rating.css'
    ],
    standalone: true,
    imports: [NgIf, NgClass, LoadingComponent, NgStyle, NgFor, MovieListComponent, CurrencyPipe, DatePipe]
})
export class MovieComponent {

  private date: Date;
  movie: any = {};
  loading: boolean;
  hideLoading: boolean;
  backgroundUrl: string;
  dataCharged: boolean;
  collection: any = {};
  showLink: boolean;
  showRevenue: boolean;
  showOverview: boolean;
  showGenres: boolean;
  showRunTime: boolean;
  showTagLine: boolean;
  showCollection: boolean;

  colors: any = {
    'Acción': 'badge-primary',
    'Animación' : 'badge-secondary',
    'Aventura' : 'badge-success',
    'Bélica' : 'badge-danger',
    'Ciencia ficción' : 'badge-warning',
    'Comedia' : 'badge-info',
    'Crimen' : 'badge-light',
    'Documental' : 'badge-light',
    'Drama' : 'badge-dark',
    'Familia' : 'badge-primary',
    'Fantasía' : 'badge-secondary',
    'Historia' : 'badge-success',
    'Misterio' : 'badge-danger',
    'Música' : 'badge-warning',
    'Película de TV' : 'badge-info',
    'Romance' : 'badge-light',
    'Suspense' : 'badge-dark',
    'Terror' : 'badge-primary',
    'Western' : 'badge-secondary'
  };

  constructor(
    private mS: MoviesService,
    private router: ActivatedRoute
  ) {
    this.loading = true;
    this.hideLoading = false;
    this.router.params
    .subscribe( param => {
      this.mS.getMovie( param.id )
        .subscribe( movie => {
          this.movie = movie;
          this.constructContent();
          this.getCollection();
          this.setBackground();
          this.dataCharged = true;
          this.removeLoading();
        });
    });
  }

  private constructContent() {
    this.showLink = this.homePageVerify(this.movie.homepage);
    this.showRevenue = this.revenueVerify(this.movie.revenue);
    this.showOverview = this.overviewVerify(this.movie.overview);
    this.showGenres = this.genreVerify(this.movie.genres);
    this.showRunTime = this.runTimeVerify(this.movie.runtime);
    this.showTagLine = this.tagLineVerify(this.movie.tagline);
  }

  private async getCollection() {
    if (this.collectionVerify(this.movie.belongs_to_collection)) {
      this.collection = await this.mS.getCollection( this.movie.belongs_to_collection.id);
      this.showCollection = true;
    }
  }

  private setBackground() {
    this.backgroundUrl = 'https://image.tmdb.org/t/p/original' + this.movie.backdrop_path;
  }

  private removeLoading() {
    this.hideLoading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  private homePageVerify( link: string ) {
    return link.length > 0 ? true : false;
  }

  private revenueVerify( revenue: number ) {
    return revenue > 0 ? true : false;
  }

  private overviewVerify( overview: string ) {
    return overview.length > 0 ? true : false;
  }

  private genreVerify( genres: any[] ) {
    return genres.length > 0 ? true : false;
  }

  private runTimeVerify( runtime: number ) {
    return runtime > 0 ? true : false;
  }

  private tagLineVerify( tagline: string ) {
    return tagline.length > 0 ? true : false;
  }

  private collectionVerify( collection: any ) {
    return collection ? true : false;
  }

}
