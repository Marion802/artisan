import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {
  private dataUrl = '/datas/datas.json'; // Chemin vers votre fichier JSON

  constructor(private http: HttpClient) { }

  getArtisans(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }

  getArtisanById(id: string): Observable<any> {
    return this.getArtisans().pipe(
      map(artisans => artisans.find((artisan: any) => artisan.id === id))
    );
  }

  getArtisansOfTheMonth(): Observable<any[]> {
    return this.getArtisans().pipe(
      map(artisans => {
        const shuffled = artisans.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3); // Sélectionne 3 artisans aléatoires
      })
    );
  }
}