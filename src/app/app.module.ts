import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// extras
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// components
import { ComponentsModule } from './components/components.module';

// pages
import { PagesModule } from './pages/pages.module';

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        ComponentsModule,
        PagesModule,
        NgxPaginationModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
