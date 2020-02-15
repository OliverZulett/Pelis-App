import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/providers/movies.service';
import { ToolsService } from '../../providers/tools.service';

@Component({
  selector: 'app-in-theatres',
  templateUrl: './in-theatres.component.html',
  styleUrls: ['./in-theatres.component.css']
})
export class InTheatresComponent implements OnInit {

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
    this.movies = await this.mS.getInTheatres();
    this.dataCharged = true;
  }

  private removeLoading() {
    this.hideLoading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

}
