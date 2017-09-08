import { Component } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { RefreshAction } from './actions/auth';
import { Store } from '@ngrx/store';
import { State } from './reducers';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <md-toolbar color="primary" class="mat-elevation-z6">
        <button *ngIf="!media.isActive('gt-sm')" type="button" md-icon-button (click)="sidenav.toggle()">
          <md-icon>menu</md-icon>
        </button>
        <span>Ye Olde Shoppe</span>
      </md-toolbar>
      <md-sidenav-container>
        <md-sidenav #sidenav class="mat-elevation-z4"
            [mode]="!media.isActive('gt-sm') ? 'push' : 'side'"
            [opened]="media.isActive('gt-sm')"
            [disableClose]="media.isActive('gt-sm')">
          <app-navigation></app-navigation>
        </md-sidenav>
        <section>
          <div>
            <ui-view></ui-view>
          </div>
        </section>
      </md-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      display: flex;
      flex-direction: column;
    }

    md-toolbar {
      z-index: 5;
    }

    md-sidenav-container {
      height: 100%;
    }

    section {
      padding: 20px 70px 50px;
    }

    section > div {
      max-width: 940px;
      margin: 0 auto;
    }
  `],
})
export class AppComponent {
  title = 'Ye Olde Shoppe';

  constructor(private store: Store<State>, public media: ObservableMedia) {
    this.store.dispatch(new RefreshAction(null));
  }
}
