import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule } from '../app-routing.module';
import { MovieBackgroundComponent } from './movie-background/movie-background.component';
import { LoadingComponent } from './loading/loading.component';
import { TruncateTextPipe } from '../pipes/truncate-text.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        AppRoutingModule,
        CommonModule,
        FontAwesomeModule,
        NgxPaginationModule,
        NavbarComponent,
        MovieCardComponent,
        MovieListComponent,
        FooterComponent,
        MovieBackgroundComponent,
        LoadingComponent,
        TruncateTextPipe,
    ],
    exports: [
        NavbarComponent,
        MovieCardComponent,
        MovieListComponent,
        FooterComponent,
        MovieBackgroundComponent,
        LoadingComponent
    ]
})
export class ComponentsModule { }
