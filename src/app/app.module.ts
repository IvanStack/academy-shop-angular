import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { UIRouterModule } from '@uirouter/angular';
import { EffectsModule } from '@ngrx/effects';

import { reducers, metaReducers } from './reducers';

import { AuthEffects } from './effects/auth';
import { AuthService } from './services/auth.service';

import {
  MdButtonModule,
  MdIconModule,
  MdListModule,
  MdSidenavModule,
  MdToolbarModule,
  MdTooltipModule,
} from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import * as routes from './app.states';
import { ProductsComponent } from './products/products.component';
import { NavigationComponent } from './navigation/navigation.component';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdSidenavModule,
    MdToolbarModule,
    MdTooltipModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ AuthEffects ]),
    UIRouterModule.forRoot(routes),
  ],
  providers: [
    AuthService,
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
