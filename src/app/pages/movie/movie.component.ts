import {
  AfterViewInit,
  Component,
  inject,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  DOCUMENT
} from "@angular/core";
import { Input as RouterInput } from "@angular/core";
import {
  NgIf,
  NgClass,
  NgStyle,
  NgFor,
  CurrencyPipe,
  DatePipe
} from "@angular/common";
import { LoadingComponent } from "../../components/loading/loading.component";
import { MovieListComponent } from "../../components/movie-list/movie-list.component";
import { MoviesServiceV2 } from "src/app/providers/movies-v2.service";
import { switchMap, tap } from "rxjs/operators";
import { EMPTY, of } from "rxjs";

@Component({
    selector: "app-movie",
    templateUrl: "./movie.component.html",
    styleUrls: ["./movie.component.css", "./rating.css"],
    imports: [
        NgIf,
        NgClass,
        LoadingComponent,
        NgStyle,
        NgFor,
        MovieListComponent,
        CurrencyPipe,
        DatePipe,
    ]
})
export class MovieComponent implements OnChanges {
  @RouterInput() id: string;

  colors: any = {
    Acción: "badge-primary",
    Animación: "badge-secondary",
    Aventura: "badge-success",
    Bélica: "badge-danger",
    "Ciencia ficción": "badge-warning",
    Comedia: "badge-info",
    Crimen: "badge-light",
    Documental: "badge-light",
    Drama: "badge-dark",
    Familia: "badge-primary",
    Fantasía: "badge-secondary",
    Historia: "badge-success",
    Misterio: "badge-danger",
    Música: "badge-warning",
    "Película de TV": "badge-info",
    Romance: "badge-light",
    Suspense: "badge-dark",
    Terror: "badge-primary",
    Western: "badge-secondary",
  };

  $movie = signal(null);
  $backgroundUrl = signal("");
  $collection = signal([]);
  $showLoader = signal(true);
  $hideLoading = signal(false);

  private readonly moviesService = inject(MoviesServiceV2);
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.id) {
      const { currentValue: movieId } = changes.id;
      this.$hideLoading.set(false);
      this.$showLoader.set(true);
      this.scrollToTop();
      this.moviesService
        .getMovie(movieId)
        .pipe(
          tap((movie) => this.$movie.set(movie)),
          tap((movie) => {
            this.$backgroundUrl.set(
              `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            );
          }),
          switchMap((movie) => {
            return movie.belongs_to_collection
              ? this.moviesService.getMovieCollection(
                  movie.belongs_to_collection.id
                )
              : of(EMPTY);
          }),
          tap((collectionResponse) => {
            if (
              collectionResponse &&
              typeof collectionResponse === "object" &&
              "parts" in collectionResponse
            ) {
              this.$collection.set(collectionResponse.parts);
            }
          })
        )
        .subscribe();
    }
  }

  removeLoading() {
    this.$hideLoading.set(true);
    setTimeout(() => {
      this.$showLoader.set(false);
    }, 2000);
  }

  private scrollToTop() {
    this.window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
