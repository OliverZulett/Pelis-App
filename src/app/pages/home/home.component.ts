import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  DOCUMENT
} from "@angular/core";
import { ToolsService } from "../../providers/tools.service";

import { LoadingComponent } from "../../components/loading/loading.component";
import { MovieBackgroundComponent } from "../../components/movie-background/movie-background.component";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MoviesServiceV2 } from "src/app/providers/movies-v2.service";
import { takeUntil, tap } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    imports: [
    LoadingComponent,
    MovieBackgroundComponent,
    MovieCardComponent
]
})
export class HomeComponent implements OnInit, OnDestroy {
  messagesBackground: string[] = [
    "las peliculas que amas",
    "nuevas peliculas",
    "las peliculas en cartelera",
    "las mejores peliculas para niños",
  ];

  $movies = signal([]);
  $backgroundUrl = signal("");
  $pagination = signal(null);

  private moviesService = inject(MoviesServiceV2);
  private toolService = inject(ToolsService);
  private document = inject(DOCUMENT);
  private window = this.document.defaultView;

  private destroy$ = new Subject();

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(page = 1) {
    this.moviesService
      .getPopular(page)
      .pipe(
        takeUntil(this.destroy$),
        tap(() =>
          this.$pagination.set(JSON.parse(sessionStorage.getItem("pagination")))
        ),
        tap((movies) =>
          this.$backgroundUrl.set(this.toolService.setBackground(movies))
        ),
        tap((movies) => this.$movies.set(movies)),
        tap(() => this.scrollToTop())
      )
      .subscribe();
  }

  private scrollToTop() {
    this.window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
