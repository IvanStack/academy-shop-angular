import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  template: `
    <md-nav-list>
      <a md-list-item uiSref="products">Products</a>
    </md-nav-list>
  `,
  styles: [`
    md-nav-list {
      min-width: 200px;
    }
  `]
})
export class NavigationComponent {
}
