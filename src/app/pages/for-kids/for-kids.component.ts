import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../providers/movies.service';
import { ToolsService } from '../../providers/tools.service';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { MovieBackgroundComponent } from '../../components/movie-background/movie-background.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-for-kids',
    templateUrl: './for-kids.component.html',
    styleUrls: ['./for-kids.component.css'],
    standalone: true,
    imports: [NgIf, NgClass, LoadingComponent, MovieBackgroundComponent, NgFor, MovieCardComponent, NgxPaginationModule]
})
export class ForKidsComponent implements OnInit {

  loading: boolean;
  hideLoading: boolean;
  dataCharged: boolean;
  movies: any[];

  p: number = 1;

  backgroundUrl: string;
  messagesBackground: string[] = [
    'las peliculas que amas',
    'nuevas peliculas',
    'las peliculas en cartelera',
    'las mejores peliculas para niños'
  ];

  constructor(
    private mS: MoviesService,
    private tS: ToolsService
  ) {
    this.movies = [];
    this.loading = true;
    this.hideLoading = false;
    this.dataCharged = false;
  }

  async ngOnInit() {
    await this.getPetition();
    this.backgroundUrl = this.tS.setBackground( this.movies );
    this.removeLoading();
  }

  private async getPetition() {
    this.movies = await this.mS.getForKids();
    this.dataCharged = true;
  }

  private removeLoading() {
    this.hideLoading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

}
