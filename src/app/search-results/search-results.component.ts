import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanService } from '../artisan.service';
import {CommonModule} from '@angular/common';
import { RouterLink } from '@angular/router';

// Déclaration du composant Angular
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  imports: [CommonModule, RouterLink]
})
export class SearchResultsComponent implements OnInit {
   // Variable pour stocker la requête de recherche
  searchQuery: string = '';
  // Variable pour stocker les résultats de la recherche
  searchResults: any[] = [];

  // Injection des dépendances : ActivatedRoute pour accéder aux paramètres de la route
  // ArtisanService pour effectuer des recherches
  constructor(private route: ActivatedRoute, private artisanService: ArtisanService) { }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Souscription aux paramètres de la route pour récupérer la requête de recherche
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || ''; // Utilisez 'q' pour correspondre au paramètre envoyé depuis le header
      this.performSearch(); // Appel de la méthode pour effectuer la recherche
    });
  }

  // Méthode pour effectuer la recherche d'artisans
  performSearch(): void {
    if (this.searchQuery) {
      console.log('Requête reçue :', this.searchQuery); // <-- Log 1
  
      this.artisanService.searchArtisans(this.searchQuery).subscribe(results => {
        this.searchResults = results;
        console.log('Résultats retournés :', this.searchResults); // <-- Log 2
      });
    }
  }
}
