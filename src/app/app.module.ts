import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UIRouterModule } from '@uirouter/angular';
import { EffectsModule } from '@ngrx/effects';

import { reducers, metaReducers } from './reducers';

import { AuthEffects } from './effects/auth';
import { UserEffects } from './effects/user';
import { ProductEffects } from './effects/product';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';

import { MaterialModule } from './material/material.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { MAIN_STATES, uiRouterConfigFn } from './app.states';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product.component';
import { NavigationComponent } from './navigation/navigation.component';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

    FormsModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    MaterialModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ AuthEffects, UserEffects, ProductEffects ]),
    UIRouterModule.forRoot({
      states: MAIN_STATES,
      config: uiRouterConfigFn,
    }),
  ],
  providers: [
    AuthService,
    UserService,
    ProductService,
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
