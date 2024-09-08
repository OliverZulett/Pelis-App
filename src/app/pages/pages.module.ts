import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about/about.component';
import { ForKidsComponent } from './for-kids/for-kids.component';
import { HomeComponent } from './home/home.component';
import { InTheatresComponent } from './in-theatres/in-theatres.component';
import { MovieComponent } from './movie/movie.component';

import { AppRoutingModule } from '../app-routing.module';
import { ComponentsModule } from '../components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        AppRoutingModule,
        CommonModule,
        ComponentsModule,
        NgxPaginationModule,
        RouterModule,
        AboutComponent,
        ForKidsComponent,
        HomeComponent,
        InTheatresComponent,
        MovieComponent
    ],
    exports: [
        AboutComponent,
        ForKidsComponent,
        HomeComponent,
        InTheatresComponent,
        MovieComponent,
    ]
})
export class PagesModule { }
