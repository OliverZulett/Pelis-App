import { Component, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { MoviesService } from "../../providers/movies.service";
import { ToolsService } from "../../providers/tools.service";
import { NgIf, NgClass, NgFor, DOCUMENT } from "@angular/common";
import { LoadingComponent } from "../../components/loading/loading.component";
import { MovieBackgroundComponent } from "../../components/movie-background/movie-background.component";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { NgxPaginationModule } from "ngx-pagination";
import { MoviesServiceV2 } from "src/app/providers/movies-v2.service";
import { Subject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";

@Component({
  selector: "app-for-kids",
  templateUrl: "./for-kids.component.html",
  styleUrls: ["./for-kids.component.css"],
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    LoadingComponent,
    MovieBackgroundComponent,
    NgFor,
    MovieCardComponent,
    NgxPaginationModule,
  ],
})
export class ForKidsComponent implements OnInit, OnDestroy {
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
      .getForKids(page)
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
    this.window.scrollTo({ top: 0, behavior: "smooth" });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
