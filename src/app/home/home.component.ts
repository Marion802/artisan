import { HeaderComponent } from '../header/header.component'; // Import du composant Header
import { FooterComponent } from '../footer/footer.component'; // Import du composant Footer
import { Component, OnInit } from '@angular/core'; // Import des outils nécessaires pour créer un composant Angular
import { CommonModule } from '@angular/common'; // Import du module Angular commun
import { ArtisanService } from '../artisan.service'; // Import du service pour interagir avec les données des artisans

// Déclaration du composant Angular
@Component({
  selector: 'app-home', // Nom du sélecteur utilisé dans le HTML
  standalone: true, // Indique que ce composant est autonome
  imports: [HeaderComponent, FooterComponent, CommonModule], // Déclare les composants et modules nécessaires
  templateUrl: './home.component.html', // Chemin vers le fichier HTML associé
  styleUrl: './home.component.scss' // Chemin vers le fichier SCSS associé
})
export class HomeComponent implements OnInit {
  artisans: any[] = []; // Tableau pour stocker les artisans
  artisansOfTheMonth: any[] = []; // Tableau pour stocker les artisans du mois

  // Injection du service ArtisanService pour interagir avec les données
  constructor(private artisanService: ArtisanService) { }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupère les artisans via le service et sélectionne 3 artisans aléatoires
    this.artisanService.getArtisans().subscribe(data => {
      this.artisans = this.getRandomArtisans(data, 3); // Appel de la méthode pour sélectionner des artisans aléatoires
    });

    // Récupère les artisans du mois via le service
    this.artisanService.getArtisansOfTheMonth().subscribe(data => {
      this.artisansOfTheMonth = data; // Stocke les artisans du mois dans la variable
    });
  }

  // Méthode pour sélectionner un nombre donné d'artisans aléatoires
  getRandomArtisans(data: any[], count: number): any[] {
    const shuffled = data.sort(() => 0.5 - Math.random()); // Mélange les artisans de manière aléatoire
    return shuffled.slice(0, count); // Retourne les premiers artisans du tableau mélangé
  }
}