import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MaterialModule } from './material/material.module';

import { FooterComponent } from './footer/footer.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { LogoutComponent } from './logout/logout.component';
import { SessionExpiredComponent } from './session-expired/session-expired.component';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HelpComponent,
    HomeComponent,
    LoaderComponent,
    LogoutComponent,
    SessionExpiredComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    LoaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
