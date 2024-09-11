import { inject, Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { MovieItem, MoviesResponse } from "../interfaces";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { ToolsService } from "./tools.service";
import { MovieResponse } from "../interfaces/movie.response";
import { CollectionResponse } from "../interfaces/collection.response";

@Injectable({
  providedIn: "root",
})
export class MoviesServiceV2 extends BaseService {
  private readonly toolsService = inject(ToolsService);

  getMovie(movieId: string): Observable<MovieResponse> {
    return this.get<MovieResponse>(
      `${environment.api_url}/movie/${movieId}?language=es-ES`
    ).pipe(
      catchError((err) => {
        console.error("Error fetching now playing movies", err);
        return of(null);
      })
    );
  }

  getNowPlaying(page = 1): Observable<MovieItem[]> {
    return this.get<MoviesResponse>(
      `${environment.api_url}/movie/now_playing?language=es-ES&page=${page}`
    ).pipe(
      tap((moviesResponse) => {
        const pagination = {
          total_results: moviesResponse.total_results,
          page: moviesResponse.page,
          total_pages: moviesResponse.total_pages,
        };
        sessionStorage.setItem("pagination", JSON.stringify(pagination));
      }),
      map((moviesResponse) => moviesResponse.results),
      catchError((err) => {
        console.error("Error fetching now playing movies", err);
        return of([]);
      })
    );
  }

  getMovieCollection(collectionId: number): Observable<CollectionResponse> {
    return this.get<CollectionResponse>(
      `${environment.api_url}/collection/${collectionId}?language=es-ES`
    ).pipe(
      catchError((err) => {
        console.error("Error fetching collections", err);
        return of(null);
      })
    );
  }

  getPopular(page = 1): Observable<MovieItem[]> {
    const resource = "discover/movie";
    const parameters = [
      `sort_by=vote_average.desc`,
      `language=es-ES`,
      `certification_country=US`,
      `vote_average.gte=8`,
      `release_date.gte=1800-01-01`,
      `release_date.lte=${this.toolsService.getDateRange(new Date())}`,
      `vote_count.gte=2000`,
      `page=${page}`,
    ];

    return this.get<MoviesResponse>(
      `${environment.api_url}/${resource}?&${parameters.join("&")}`
    ).pipe(
      tap((moviesResponse) => {
        const pagination = {
          total_results: moviesResponse.total_results,
          page: moviesResponse.page,
          total_pages: moviesResponse.total_pages,
        };
        sessionStorage.setItem("pagination", JSON.stringify(pagination));
      }),
      map((moviesResponse) => moviesResponse.results),
      catchError((err) => {
        console.error("Error fetching popular movies", err);
        return of([]);
      })
    );
  }

  getForKids(page = 1): Observable<MovieItem[]> {
    const resource = "discover/movie";
    const parameters = [
      `sort_by=primary_release_date.desc`,
      `language=es-ES`,
      `certification_country=US`,
      `certification=G`,
      `vote_average.gte=6.0`,
      `release_date.gte=1990-01-01`,
      `release_date.lte=${this.toolsService.getDateRange(new Date())}`,
      `vote_count.gte=1000`,
      `with_original_language=en`,
      `region=US`,
      `page=${page}`,
    ];

    return this.get<MoviesResponse>(
      `${environment.api_url}/${resource}?&${parameters.join("&")}`
    ).pipe(
      tap((moviesResponse) => {
        const pagination = {
          total_results: moviesResponse.total_results,
          page: moviesResponse.page,
          total_pages: moviesResponse.total_pages,
        };
        sessionStorage.setItem("pagination", JSON.stringify(pagination));
      }),
      map((moviesResponse) => moviesResponse.results),
      catchError((err) => {
        console.error("Error fetching popular movies", err);
        return of([]);
      })
    );
  }
}
