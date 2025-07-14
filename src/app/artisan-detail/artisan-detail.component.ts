import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ArtisanService } from '../artisan.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artisan-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './artisan-detail.component.html',
  styleUrls: ['./artisan-detail.component.scss']
})
export class ArtisanDetailComponent implements OnInit {
  artisan: any; // Variable pour stocker les détails de l'artisan
  contactForm = {
    name: '',
    subject: '',
    message: ''
  };

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService
  ) { }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Récupère l'ID de l'artisan à partir des paramètres de la route
    if (id) {
      // Appel au service pour obtenir les détails de l'artisan par ID
      this.artisanService.getArtisanById(id).subscribe(data => {
        this.artisan = data; // Stocke les détails de l'artisan dans la variable artisan
      });
    } else {
      // Gérer le cas où l'ID est null
      console.error('ID de l\'artisan non trouvé');
    }
  }

  // Méthode pour envoyer un email à l'artisan
  sendEmail(): void {
    this.artisanService.sendEmail(this.contactForm).then(() => {
      console.log('Email envoyé avec succès via emailjs');
      // Réinitialiser les champs du formulaire après l'envoi
      this.contactForm = {
        name: '',
        subject: '',
        message: ''
      };
    }).catch(error => {
      console.error('Erreur lors de l\'envoi de l\'email via emailjs', error);
    });
  }
}