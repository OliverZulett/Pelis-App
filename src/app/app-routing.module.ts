import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { InTheatresComponent } from './pages/in-theatres/in-theatres.component';
import { ForKidsComponent } from './pages/for-kids/for-kids.component';
import { AboutComponent } from './pages/about/about.component';
import { MovieComponent } from './pages/movie/movie.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'in-theatres', component: InTheatresComponent },
  { path: 'for-kids', component: ForKidsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
