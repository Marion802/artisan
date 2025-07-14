import { Component } from '@angular/core';
import {Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchQuery: string = '';

  constructor(private router: Router) { }

  onSearch(query: string): void {
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q : query } });
    }
  }
}
