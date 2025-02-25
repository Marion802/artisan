import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtisanService } from '../artisan.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // Importer DomSanitizer
import { RouterLink, ActivatedRoute } from '@angular/router'; // Importer ActivatedRoute

@Component({
  selector: 'app-artisan-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule, RouterLink],
  templateUrl: './artisan-list.component.html',
  styleUrls: ['./artisan-list.component.scss']
})
export class ArtisanListComponent implements OnInit {
  artisans: any[] = []; // Variable pour stocker la liste des artisans
  filteredArtisans: any[] = []; // Variable pour stocker la liste des artisans filtrés
  sanitizedDescriptions: SafeHtml[] = []; // Variable pour stocker les descriptions nettoyées

  constructor(
    private artisanService: ArtisanService,
    private sanitizer: DomSanitizer, // Injecter DomSanitizer
    private route: ActivatedRoute // Injecter ActivatedRoute
  ) { }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.artisanService.getArtisans().subscribe(data => {
      this.artisans = data; // Stocke la liste des artisans
      this.route.queryParams.subscribe(params => {
        const category = params['category'];
        if (category) {
          this.filteredArtisans = this.artisans.filter(artisan => artisan.category === category);
        } else {
          this.filteredArtisans = this.artisans;
        }
        this.sanitizedDescriptions = this.filteredArtisans.map(artisan => 
          this.sanitizer.bypassSecurityTrustHtml(artisan.description)); // Nettoyer les descriptions
      });
    });
  }
}