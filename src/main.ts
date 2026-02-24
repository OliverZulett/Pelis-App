import { enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from './app/components/components.module';
import { PagesModule } from './app/pages/pages.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideZoneChangeDetection(),importProvidersFrom(BrowserModule, AppRoutingModule, FontAwesomeModule, ComponentsModule, PagesModule, NgxPaginationModule),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
