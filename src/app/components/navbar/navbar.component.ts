import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MoviesService } from 'src/app/providers/movies.service';
import { Router, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { faTrashAlt, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { NgClass, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        './navbar.component.css',
        './hover.effect.link.css'
    ],
    standalone: true,
    imports: [NgClass, RouterLink, NgIf, FaIconComponent, RouterLinkActive, MovieListComponent]
})
export class NavbarComponent {

  onSearch = false;
  loadingResults = false;
  noResults = false;
  whitColor = false;
  miniMenu = true;
  movies: any[] = [];
  ResultsNumber: number;
  iconTrash = faTrashAlt;
  menuIconClose = faTimes;
  menuIconOpen = faBars;

  @ViewChild('navbar', {read: ElementRef, static: true}) navbar: ElementRef;

  @HostListener('window:scroll', ['$event'])
  changeNavbarColorOnScroll($event: Event) {
    const scrollOffset = window.scrollY;
    const innerheight = window.innerHeight;
    if (scrollOffset > innerheight || this.onSearch === true) {
      this.whitColor = true;
    } else if (this.miniMenu) {
      this.whitColor = false;
    }
  }

  constructor(
    private mS: MoviesService,
    private router: RouterModule
  ) {
    this.ResultsNumber = this.ShowResultsByScreenWidth();
  }

  toggleMiniMenu() {
    this.miniMenu = !this.miniMenu;
    this.whitColor = true;
  }

  async searchMovie( term: string ) {
    if (term.length > 0) {
      this.whitColor = true;
      this.onSearch = true;
      this.loadingResults = true;
      this.movies = await this.mS.searchMovie( term );
      if (this.movies && this.movies.length > 0) {
        this.loadingResults = false;
      } else {
        this.loadingResults = false;
        this.noResults = true;
      }
    }
  }

  clearSearch() {
    this.movies = [];
    this.onSearch = false;
    this.loadingResults = true;
    this.noResults = false;
  }

  checkGoHomeResponse( response: boolean ) {
    if (response) {
      this.clearSearch();
    }
    return;
  }

  ShowResultsByScreenWidth() {
    const width = window.innerWidth;
    let results = 0;
    if ( width <= 576 ) {
      results = 5;
    } else if ( width > 576 && width <= 768) {
      results = 4;
    } else if ( width > 768 && width <= 992) {
      this.ResultsNumber = 5;
    } else if ( width > 990 && width <= 1200) {
      results = 5;
    } else if ( width > 1200 && width <= 1366 ) {
      results = 7;
    } else if ( width > 1366 ) {
      results = 11;
    }
    return results;

  }

}
