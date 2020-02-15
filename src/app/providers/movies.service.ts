import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolsService } from './tools.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  // link to get an api key : https://www.themoviedb.org/settings/api

  private apiKey = 'api_key=<your-api-key>';
  private urlMovieDB = 'https://api.themoviedb.org/3';
  private url: string;
  private language = 'language=es';
  private petitionType: string;
  private sortBy = 'sort_by=';
  private query = 'query=';
  private termForSearch: string;
  private movieId: string;
  private collectionId: string; // the id of the saga to which the movie belongs
  private parameters: string[] = [];

  constructor(
    private http: HttpClient,
    private tS: ToolsService
  ) { }

  public getPopulars() {

    this.petitionType = 'discover/movie';
    this.sortBy += 'vote_count.desc';
    this.parameters = [
      'vote_average.gte=8.0',
      'vote_count.gte=10000'
    ];

    this.url = `${this.urlMovieDB}/${this.petitionType}?${this.apiKey}&${this.sortBy}&${this.language}&${this.parameters.join('&')}`;

    return this.tS.getPetition( this.url );

  }

  public getInTheatres() {

    this.petitionType = 'discover/movie';
    this.sortBy += 'release_date.desc';
    this.parameters = [
      `release_date.gte=${this.tS.getDateRange(new Date(), 31)}`,
      `release_date.lte=${this.tS.getDateRange(new Date())}`,
      `with_release_type=3|2`,
      `with_original_language=en`,
      `region=US`
    ];

    this.url = `${this.urlMovieDB}/${this.petitionType}?${this.apiKey}&${this.sortBy}&${this.language}&${this.parameters.join('&')}`;

    return this.tS.getPetition( this.url );

  }

  public getForKids() {

    this.petitionType = 'discover/movie';
    this.sortBy += 'vote_average.desc';
    this.parameters = [
      `certification_country=US`,
      `certification=G`,
      `vote_average.gte=6.0`,
      `release_date.gte=2000-01-01`,
      `release_date.lte=${this.tS.getDateRange(new Date())}`,
      `vote_count.gte=1000`,
      `with_original_language=en`,
      `region=US`
    ];

    this.url = `${this.urlMovieDB}/${this.petitionType}?${this.apiKey}&${this.sortBy}&${this.language}&${this.parameters.join('&')}`;

    return this.tS.getPetition( this.url );

  }

  public searchMovie( parameter: string ) {

    this.termForSearch = parameter;
    this.petitionType = 'search/movie';

    this.url = `${this.urlMovieDB}/${this.petitionType}?${this.apiKey}&${this.query}${this.termForSearch}&${this.language}`;

    return this.tS.getPetition( this.url );

  }

  public getMovie( id: string ) {

    this.movieId = id;
    this.petitionType = `movie`;

    this.url = `${this.urlMovieDB}/${this.petitionType}/${this.movieId}?${this.apiKey}&${this.language}`;

    return this.http.get(this.url)
              .pipe(
                map((res: any) => res)
              );

  }

  public getCollection( id: string ) {

    this.collectionId = id;
    this.petitionType = `collection`;

    this.url = `${this.urlMovieDB}/${this.petitionType}/${this.collectionId}?${this.apiKey}&${this.language}`;

    return this.tS.getPetition( this.url );

  }

}
