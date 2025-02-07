import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <h1>Welcome to {{title}}!</h1>
    <app-footer></app-footer>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'artisan';
}
