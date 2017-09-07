import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <md-toolbar color="primary" class="mat-elevation-z6">
        <span>Ye Olde Shoppe</span>
      </md-toolbar>
      <md-sidenav-container>
        <md-sidenav class="mat-elevation-z4" mode="side" opened="true" disableClose="true">
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
}
