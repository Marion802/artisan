import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import emailjs from 'emailjs-com'; 
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {
  private dataUrl = '/datas/datas.json'; // Chemin vers votre fichier JSON

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir la liste des artisans
  getArtisans(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }

  // Méthode pour obtenir un artisan par ID
  getArtisanById(id: string): Observable<any> {
    return this.getArtisans().pipe(
      map((artisans: any[]) => artisans.find((artisan: any) => artisan.id === id))
    );
  }

  // Méthode pour obtenir les artisans du mois
  getArtisansOfTheMonth(): Observable<any[]> {
    return this.getArtisans().pipe(
      map((artisans: any[]) => {
        const shuffled = artisans.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3); // Sélectionne 3 artisans aléatoires
      })
    );
  }

  // Méthode pour envoyer un email via emailjs
  sendEmail(contactForm: any): Promise<any> {
    const emailData = {
      from_name: contactForm.name, // Nom de l'expéditeur
      subject: contactForm.subject, // Sujet de l'email
      message: contactForm.message // Corps de l'email
    };

    // Utilisation de emailjs pour envoyer l'email
    return emailjs.send(
      environment.emailjs.serviceId, // Service ID depuis environment.ts
      environment.emailjs.templateId, // Template ID depuis environment.ts
      emailData,
      environment.emailjs.userId // User ID depuis environment.ts
    );
  }


  // Méthode pour rechercher des artisans
 searchArtisans(query: string): Observable<any[]> {
  return this.getArtisans().pipe(
    map((artisans: any[]) => artisans.filter((artisan: any) => {
      // Normalisation de la requête et des données pour supprimer les accents
      const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const normalizedName = artisan.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const normalizedSpecialty = artisan.specialty.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      // Comparaison normalisée
      return normalizedName.includes(normalizedQuery) || normalizedSpecialty.includes(normalizedQuery);
    }))
  );
}
}