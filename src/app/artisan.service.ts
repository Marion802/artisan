import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';
import { map } from 'rxjs/operators';

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

  // Méthode pour envoyer un email
  sendEmail(contactForm: any): Observable<any> {
    const emailData = {
      to: environment.contactEmail,
      subject: contactForm.subject,
      body: `Nom: ${contactForm.name}\n\nMessage: ${contactForm.message}`
    };
    return this.http.post('/api/send-email', emailData);
  }

  // Méthode pour rechercher des artisans
  searchArtisans(query: string): Observable<any[]> {
    return this.getArtisans().pipe(
      map((artisans: any[]) => artisans.filter((artisan: any) =>
        artisan.name.toLowerCase().includes(query.toLowerCase()) ||
        artisan.description.toLowerCase().includes(query.toLowerCase())
      ))
    );
  }
}