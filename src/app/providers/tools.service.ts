import { Injectable } from '@angular/core';
import { map, concatMap, filter, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  movies: any[] = [];

  constructor(private http: HttpClient) { }

  private getPages(url: string, ids: number[]): any {
    return from(ids).pipe(
      concatMap(id => this.http.get(`${url}&page=${id}`) as Observable<any>)
    );
  }

  public async getPetition(url: string) {

    this.movies = [];

    const arrayOfPages = await this.getTheNumberOfPages(url);

    if (arrayOfPages.length > 0) {
      return this.getPages(url, arrayOfPages)
              .pipe(
                map((res: any) => {
                  this.movies = this.filterMovies(this.movies.concat(res.results));
                  return this.movies;
                })
              ).toPromise();
    } else {
      return this.http.get(url)
              .pipe(
                map((res: any) => res)
              ).toPromise();
    }

  }

  public getDateRange(today: Date, subtraction: number = 0) {
    today.setDate(today.getDate() - subtraction);
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return (yyyy + '-' + mm + '-' + dd);
  }

  public setBackground( movies: any ) {
    if (movies && movies.length > 0 && movies !== undefined ) {
      const backgroundPosition = Math.floor(Math.random() * (movies.length - 0 + 1) + 0);
      return 'https://image.tmdb.org/t/p/original' + movies[backgroundPosition].backdrop_path;
    } else {
      return 'assets/img/background-default.jpg';
    }
  }

  private getTheNumberOfPages(url: string) {
    const pages: number[] = [];
    return this.http.get(url)
            .pipe(
              map((res: any) => {
                for (let i = 0; i < res.total_pages; i++) {
                  pages[i] = i + 1;
                }
                return pages;
              })
            ).toPromise();
  }

  // Only show movies with backdrop,poster and overview
  private filterMovies(movies: any[] = []) {
    const cleanMovieArray: any[] = [];
    movies.forEach(movie => {
      if (movie.poster_path !== null && movie.backdrop_path !== null && movie.overview.length > 0) {
        cleanMovieArray.push(movie);
      }
    });

    return cleanMovieArray;
  }

}
