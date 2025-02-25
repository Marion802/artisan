import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanService } from '../artisan.service';
import {CommonModule} from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  imports: [CommonModule, RouterLink]
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private route: ActivatedRoute, private artisanService: ArtisanService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      this.performSearch();
    });
  }

  performSearch(): void {
    if (this.searchQuery) {
      this.artisanService.searchArtisans(this.searchQuery).subscribe(results => {
        this.searchResults = results;
      });
    }
  }
}
